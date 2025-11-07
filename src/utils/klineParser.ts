import type { BinanceWSKline } from "@/types/ws.type";
import type { CandleData, VolumeData, BinanceRestKline } from "@/types/kline.type";

export const parseWsKlineToCandle = (kline: BinanceWSKline): CandleData => ({
  time: (kline.k.t / 1000) as CandleData['time'],
  open: parseFloat(kline.k.o),
  high: parseFloat(kline.k.h),
  low: parseFloat(kline.k.l),
  close: parseFloat(kline.k.c),
});

export const parseWsKlineToVolume = (kline: BinanceWSKline): VolumeData => ({
  time: (kline.k.t / 1000) as VolumeData['time'],
  value: parseFloat(kline.k.v),
  color: parseFloat(kline.k.c) >= parseFloat(kline.k.o) 
    ? 'rgba(0, 150, 136, 0.8)' 
    : 'rgba(255, 82, 82, 0.8)',
});

export const parseRestKlineToCandle = (kline: BinanceRestKline): CandleData => ({
  time: (kline[0] / 1000) as CandleData['time'],
  open: parseFloat(kline[1]),
  high: parseFloat(kline[2]),
  low: parseFloat(kline[3]),
  close: parseFloat(kline[4]),
});

export const parseRestKlineToVolume = (kline: BinanceRestKline): VolumeData => ({
  time: (kline[0] / 1000) as VolumeData['time'],
  value: parseFloat(kline[5]),
  color: parseFloat(kline[4]) >= parseFloat(kline[1]) 
    ? 'rgba(0, 150, 136, 0.8)' 
    : 'rgba(255, 82, 82, 0.8)',
});