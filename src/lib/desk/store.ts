import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Buy, BuyDocument, BuyEvent, StepData } from "./types";
import { mergeStepData } from "./step-data";

/*
  Where buys live. With SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set, in
  Mark's own Supabase project (supabase/migrations). Without them, in a
  local JSON file (.data/desk.json, gitignored): the stand-in for building
  and previewing before the database exists. In production with no
  database, the desk refuses to run rather than lose a seller's details.
*/
export type NewBuy = Pick<Buy, "channel" | "source" | "stepData">;

export interface DeskStore {
  kind: "supabase" | "local";
  list(): Promise<Buy[]>;
  get(id: string): Promise<Buy | null>;
  create(input: NewBuy, event?: Omit<BuyEvent, "at">): Promise<Buy>;
  findOpenDuplicate(phone: string, vin?: string): Promise<Buy | null>;
  merge(id: string, readVersion: number, patch: Partial<StepData>): Promise<{ ok: true; buy: Buy } | { ok: false; error: "conflict" | "not-found" }>;
  addEvent(id: string, event: Omit<BuyEvent, "at">): Promise<void>;
  setLost(id: string, lost: Buy["lost"] | null): Promise<void>;
  fileDocument(id: string, doc: Omit<BuyDocument, "id" | "filedAt">): Promise<BuyDocument>;
  voidDocument(id: string, docId: string, reason: string): Promise<void>;
  findBySignToken(token: string): Promise<{ buy: Buy; doc: BuyDocument } | null>;
  sign(docId: string, signature: NonNullable<BuyDocument["signature"]>): Promise<boolean>;
}

const now = () => new Date().toISOString();
export const newToken = () => crypto.randomBytes(24).toString("base64url");

/* ---------- local stand-in ---------- */

const FILE = path.join(process.cwd(), ".data", "desk.json");
let chain: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<Buy[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Buy[];
  } catch {
    return [];
  }
}
async function writeAll(buys: Buy[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(buys, null, 1));
  await fs.rename(tmp, FILE);
}
/** Serialise every write so two requests can't interleave read-modify-write. */
function locked<T>(fn: (buys: Buy[]) => Promise<{ value: T; save: boolean }> | { value: T; save: boolean }): Promise<T> {
  const run = chain.then(async () => {
    const buys = await readAll();
    const r = await fn(buys);
    if (r.save) await writeAll(buys);
    return r.value;
  });
  chain = run.catch(() => undefined);
  return run;
}

const localStore: DeskStore = {
  kind: "local",
  list: async () => (await readAll()).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  get: async (id) => (await readAll()).find((b) => b.id === id) ?? null,
  create: (input, event) =>
    locked((buys) => {
      const t = now();
      const buy: Buy = { id: crypto.randomUUID(), createdAt: t, updatedAt: t, version: 0, documents: [], events: [{ at: t, kind: "created", ...(event ?? {}) }], ...input };
      buys.push(buy);
      return { value: buy, save: true };
    }),
  findOpenDuplicate: async (phone, vin) =>
    (await readAll()).find((b) => !b.lost && !b.stepData.pickedUp && (b.stepData.seller?.phone === phone || (vin && b.stepData.car?.vin === vin))) ?? null,
  merge: (id, readVersion, patch) =>
    locked<{ ok: true; buy: Buy } | { ok: false; error: "conflict" | "not-found" }>((buys) => {
      const b = buys.find((x) => x.id === id);
      if (!b) return { value: { ok: false as const, error: "not-found" as const }, save: false };
      const r = mergeStepData(b.stepData, b.version, readVersion, patch);
      if (!r.ok) return { value: { ok: false as const, error: "conflict" as const }, save: false };
      b.stepData = r.stepData;
      b.version = r.version;
      b.updatedAt = now();
      return { value: { ok: true as const, buy: b }, save: true };
    }),
  addEvent: (id, event) =>
    locked((buys) => {
      const b = buys.find((x) => x.id === id);
      if (b) b.events.push({ at: now(), ...event });
      return { value: undefined, save: Boolean(b) };
    }),
  setLost: (id, lost) =>
    locked((buys) => {
      const b = buys.find((x) => x.id === id);
      if (b) {
        if (lost) b.lost = lost;
        else delete b.lost;
        b.updatedAt = now();
      }
      return { value: undefined, save: Boolean(b) };
    }),
  fileDocument: (id, doc) =>
    locked((buys) => {
      const b = buys.find((x) => x.id === id);
      if (!b) throw new Error("not-found");
      const d: BuyDocument = { id: crypto.randomUUID(), filedAt: now(), ...doc };
      b.documents.push(d);
      return { value: d, save: true };
    }),
  voidDocument: (id, docId, reason) =>
    locked((buys) => {
      const d = buys.find((x) => x.id === id)?.documents.find((x) => x.id === docId);
      if (d && !d.voidedAt) {
        d.voidedAt = now();
        d.voidReason = reason;
      }
      return { value: undefined, save: Boolean(d) };
    }),
  findBySignToken: async (token) => {
    for (const buy of await readAll()) {
      const doc = buy.documents.find((d) => d.signToken === token && !d.voidedAt);
      if (doc) return { buy, doc };
    }
    return null;
  },
  sign: (docId, signature) =>
    locked((buys) => {
      for (const b of buys) {
        const d = b.documents.find((x) => x.id === docId);
        if (d && !d.voidedAt && !d.signature) {
          d.signature = signature;
          return { value: true, save: true };
        }
      }
      return { value: false, save: false };
    }),
};

/* ---------- Supabase ---------- */

type Row = { id: string; created_at: string; updated_at: string; version: number; channel: Buy["channel"]; source: Buy["source"]; step_data: StepData; lost: Buy["lost"] | null };
type DocRow = { id: string; buy_id: string; type: BuyDocument["type"]; filed_at: string; snapshot: Record<string, string>; sign_token: string | null; signature: BuyDocument["signature"] | null; voided_at: string | null; void_reason: string | null };
type EventRow = { buy_id: string; at: string; kind: BuyEvent["kind"]; text: string | null; by: string | null };

const toDoc = (d: DocRow): BuyDocument => ({
  id: d.id,
  type: d.type,
  filedAt: d.filed_at,
  snapshot: d.snapshot,
  ...(d.sign_token ? { signToken: d.sign_token } : {}),
  ...(d.signature ? { signature: d.signature } : {}),
  ...(d.voided_at ? { voidedAt: d.voided_at, voidReason: d.void_reason ?? undefined } : {}),
});

function supabaseStore(db: SupabaseClient): DeskStore {
  const hydrate = async (rows: Row[]): Promise<Buy[]> => {
    if (!rows.length) return [];
    const ids = rows.map((r) => r.id);
    const [{ data: docs }, { data: events }] = await Promise.all([
      db.from("buy_documents").select("*").in("buy_id", ids),
      db.from("buy_events").select("buy_id, at, kind, text, by").in("buy_id", ids).order("at"),
    ]);
    return rows.map((r) => ({
      id: r.id,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      version: r.version,
      channel: r.channel,
      source: r.source,
      stepData: r.step_data,
      ...(r.lost ? { lost: r.lost } : {}),
      documents: ((docs ?? []) as DocRow[]).filter((d) => d.buy_id === r.id).map(toDoc),
      events: ((events ?? []) as EventRow[]).filter((e) => e.buy_id === r.id).map((e) => ({ at: e.at, kind: e.kind, text: e.text ?? undefined, by: e.by ?? undefined })),
    }));
  };
  const one = async (id: string) => {
    const { data } = await db.from("buys").select("*").eq("id", id).maybeSingle();
    return data ? (await hydrate([data as Row]))[0] : null;
  };
  return {
    kind: "supabase",
    list: async () => {
      const { data, error } = await db.from("buys").select("*").order("created_at", { ascending: false }).limit(500);
      if (error) throw error;
      return hydrate((data ?? []) as Row[]);
    },
    get: one,
    create: async (input, event) => {
      const { data, error } = await db.from("buys").insert({ channel: input.channel, source: input.source, step_data: input.stepData }).select("*").single();
      if (error) throw error;
      await db.from("buy_events").insert({ buy_id: (data as Row).id, kind: "created", text: event?.text ?? null, by: event?.by ?? null });
      return (await one((data as Row).id))!;
    },
    findOpenDuplicate: async (phone, vin) => {
      const q = db.from("buys").select("*").is("lost", null).order("created_at", { ascending: false }).limit(1);
      const { data } = vin ? await q.or(`seller_phone.eq.${phone},vin.eq.${vin}`) : await q.eq("seller_phone", phone);
      const row = (data ?? [])[0] as Row | undefined;
      return row && !row.step_data.pickedUp ? (await hydrate([row]))[0] : null;
    },
    merge: async (id, readVersion, patch) => {
      const remove = Object.entries(patch).filter(([, v]) => v === undefined).map(([k]) => k);
      const set = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
      const { data, error } = await db.rpc("merge_buy_step_data", { p_id: id, p_version: readVersion, p_patch: set, p_remove: remove });
      if (error) throw error;
      if (data === null) return (await one(id)) ? { ok: false, error: "conflict" } : { ok: false, error: "not-found" };
      return { ok: true, buy: (await one(id))! };
    },
    addEvent: async (id, e) => {
      await db.from("buy_events").insert({ buy_id: id, kind: e.kind, text: e.text ?? null, by: e.by ?? null });
    },
    setLost: async (id, lost) => {
      await db.from("buys").update({ lost, updated_at: now() }).eq("id", id);
    },
    fileDocument: async (id, doc) => {
      const { data, error } = await db.from("buy_documents").insert({ buy_id: id, type: doc.type, snapshot: doc.snapshot, sign_token: doc.signToken ?? null }).select("*").single();
      if (error) throw error;
      return toDoc(data as DocRow);
    },
    voidDocument: async (_id, docId, reason) => {
      await db.from("buy_documents").update({ voided_at: now(), void_reason: reason }).eq("id", docId).is("voided_at", null);
    },
    findBySignToken: async (token) => {
      const { data } = await db.from("buy_documents").select("*").eq("sign_token", token).is("voided_at", null).maybeSingle();
      if (!data) return null;
      const buy = await one((data as DocRow).buy_id);
      return buy ? { buy, doc: toDoc(data as DocRow) } : null;
    },
    sign: async (docId, signature) => {
      const { data } = await db.from("buy_documents").update({ signature }).eq("id", docId).is("signature", null).is("voided_at", null).select("id");
      return Boolean(data?.length);
    },
  };
}

let cached: DeskStore | null = null;

/** The store, or null when the desk has nowhere safe to keep data (production with no database). */
export function deskStore(): DeskStore | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) cached = supabaseStore(createClient(url, key, { auth: { persistSession: false } }));
  else if (process.env.NODE_ENV !== "production" || process.env.DESK_LOCAL_STORE === "1") cached = localStore;
  return cached;
}
