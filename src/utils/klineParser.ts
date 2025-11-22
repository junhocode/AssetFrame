import type { BinanceRestKline } from "@/types/kline.type";
import type { BinanceWSKline } from "@/types/ws.type";

export const parseWsKlineToRaw = (
  wsKline: BinanceWSKline["k"]
): BinanceRestKline => {
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
