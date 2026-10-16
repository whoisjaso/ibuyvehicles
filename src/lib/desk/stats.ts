import type { Buy, Channel } from "./types";
import { stageOf } from "./pipeline";

/*
  The numbers Mark sees each week: where the cars come from, how fast he
  answers, and what each channel turns into. Only counted from records.
*/
export type Numbers = {
  leads: number;
  reached: number;
  offered: number;
  bought: number;
  lost: number;
  paidTotal: number;
  avgPaid: number | null;
  medianMinutesToReach: number | null;
  byChannel: { channel: Channel; leads: number; bought: number }[];
};

export function numbersFor(buys: Buy[], since: Date): Numbers {
  const list = buys.filter((b) => Date.parse(b.createdAt) >= since.getTime());
  const stage = list.map(stageOf);
  const paid = list.map((b) => b.stepData.payment?.amount).filter((n): n is number => typeof n === "number");
  const reachMins = list
    .filter((b) => b.stepData.reached)
    .map((b) => (Date.parse(b.stepData.reached!.at) - Date.parse(b.createdAt)) / 60_000)
    .sort((a, b) => a - b);
  const channels = [...new Set(list.map((b) => b.channel))];
  return {
    leads: list.length,
    reached: list.filter((b) => b.stepData.reached).length,
    offered: list.filter((b) => b.stepData.offer).length,
    bought: stage.filter((s) => s === "bought").length,
    lost: stage.filter((s) => s === "lost").length,
    paidTotal: paid.reduce((a, b) => a + b, 0),
    avgPaid: paid.length ? Math.round(paid.reduce((a, b) => a + b, 0) / paid.length) : null,
    medianMinutesToReach: reachMins.length ? Math.round(reachMins[Math.floor(reachMins.length / 2)]) : null,
    byChannel: channels
      .map((c) => ({ channel: c, leads: list.filter((b) => b.channel === c).length, bought: list.filter((b, i) => b.channel === c && stage[i] === "bought").length }))
      .sort((a, b) => b.leads - a.leads),
  };
}
