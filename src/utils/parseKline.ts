import type { BinanceRestKline, BinanceWSKline } from "@/types/kline.type";

export const parseKline = (wsKline: BinanceWSKline["k"]): BinanceRestKline => {
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
