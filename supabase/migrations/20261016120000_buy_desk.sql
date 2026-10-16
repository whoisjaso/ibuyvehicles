-- iBuy Vehicles buy desk. Apply to Mark's own Supabase project only, never
-- to another business's database. Additive; nothing here drops or rewrites rows.

create extension if not exists pgcrypto;

-- One record per car Mark might buy. Answers live under named keys of
-- step_data; "done" is never stored (src/lib/desk/guide.ts computes it).
create table if not exists public.buys (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 0,
  channel text not null default 'other',
  source jsonb not null default '{}'::jsonb,
  step_data jsonb not null default '{}'::jsonb,
  seller_phone text generated always as (step_data #>> '{seller,phone}') stored,
  vin text generated always as (step_data #>> '{car,vin}') stored,
  lost jsonb
);
create index if not exists buys_created_idx on public.buys (created_at desc);
create index if not exists buys_phone_idx on public.buys (seller_phone);
create index if not exists buys_vin_idx on public.buys (vin);

-- Append-only history: calls, texts, offers, payments. Never updated.
create table if not exists public.buy_events (
  id bigint generated always as identity primary key,
  buy_id uuid not null references public.buys (id),
  at timestamptz not null default now(),
  kind text not null,
  text text,
  by text
);
create index if not exists buy_events_buy_idx on public.buy_events (buy_id, at);

-- Filed documents. Never deleted or rewritten: voided and filed again.
create table if not exists public.buy_documents (
  id uuid primary key default gen_random_uuid(),
  buy_id uuid not null references public.buys (id),
  type text not null,
  filed_at timestamptz not null default now(),
  snapshot jsonb not null,
  sign_token text unique,
  signature jsonb,
  voided_at timestamptz,
  void_reason text
);
create index if not exists buy_documents_buy_idx on public.buy_documents (buy_id);

-- Compare-and-swap merge of top-level step_data keys. Returns the new
-- version, or null when someone else wrote first.
create or replace function public.merge_buy_step_data(p_id uuid, p_version integer, p_patch jsonb, p_remove text[] default '{}')
returns integer
language sql
security invoker
as $$
  update public.buys
     set step_data = (step_data || p_patch) - p_remove,
         version = version + 1,
         updated_at = now()
   where id = p_id and version = p_version
  returning version;
$$;

-- Documents cannot be rewritten once signed.
create or replace function public.buy_documents_guard() returns trigger language plpgsql as $$
begin
  if old.signature is not null and (new.snapshot is distinct from old.snapshot or new.signature is distinct from old.signature) then
    raise exception 'A signed document cannot be changed. Void it and file again.';
  end if;
  return new;
end $$;
drop trigger if exists buy_documents_guard on public.buy_documents;
create trigger buy_documents_guard before update on public.buy_documents for each row execute function public.buy_documents_guard();

-- The server reaches these tables with the service role key only. Row level
-- security is on with no policies, so the public anon key can read nothing.
alter table public.buys enable row level security;
alter table public.buy_events enable row level security;
alter table public.buy_documents enable row level security;
revoke all on public.buys, public.buy_events, public.buy_documents from anon, authenticated;
