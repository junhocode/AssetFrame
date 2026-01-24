import type { Kline, WSKline } from "@/types/kline.type";

export const parseKline = (wsKline: WSKline["k"]): Kline => {
  return [
    wsKline.t,
    wsKline.o,
    wsKline.h,
    wsKline.l,
    wsKline.c,
    wsKline.v,
    wsKline.T,
    wsKline.q,
    wsKline.n,
    "0",
    "0",
    "0",
  ];
};
