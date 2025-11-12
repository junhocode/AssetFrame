import type { BinanceWSKline } from "@/types/ws.type";
import type { CandleData, VolumeData, BinanceRestKline } from "@/types/kline.type";

export const parseWsKlineToCandle = (klineData: BinanceWSKline['k']): CandleData => ({
  time: (klineData.t / 1000) as CandleData['time'],
  open: parseFloat(klineData.o),
  high: parseFloat(klineData.h),
  low: parseFloat(klineData.l),
  close: parseFloat(klineData.c),
});

export const parseWsKlineToVolume = (klineData: BinanceWSKline['k']): VolumeData => ({
  time: (klineData.t / 1000) as VolumeData['time'],
  value: parseFloat(klineData.v),
  color: parseFloat(klineData.c) >= parseFloat(klineData.o) 
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