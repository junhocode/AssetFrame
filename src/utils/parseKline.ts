import type { Kline, WSKline } from "@/types/kline.type";

export const parseKline = (wsKline: WSKline["k"]): Kline => {
  // ws로 받아오는 kline은 캔들 정보읲 포맷으로 파싱해야 한다.
  // rest의 kline은 캔들 데이터의 형태로 전달된다.
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
    "0", // 0은 사옹하지 않는 필드
    "0",
    "0",
  ];
};
