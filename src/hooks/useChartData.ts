import { useMemo } from "react";
import type { InfiniteData } from "@tanstack/react-query";
import type { CandlestickData, HistogramData, UTCTimestamp } from "lightweight-charts";
import { VOLUME_COLORS } from "@/constants/configs";
import type { Kline } from "@/types/kline.type";

export const useChartData = (data: InfiniteData<Kline[]> | undefined) => {
  return useMemo(() => {
    if (!data?.pages || data.pages.length === 0) {
      return { candlestickData: [], volumeData: [] };
    }

    const allKlines = data.pages.flat();

    allKlines.sort((a, b) => a[0] - b[0]);

    const candlestickData: CandlestickData[] = [];
    const volumeData: HistogramData[] = [];

    let lastTime: number | null = null;

    for (const kline of allKlines) {
      const rawTime = kline[0];

      if (rawTime === lastTime) continue;
      lastTime = rawTime;

      const time = (rawTime / 1000) as UTCTimestamp;
      const open = parseFloat(kline[1]);
      const high = parseFloat(kline[2]);
      const low = parseFloat(kline[3]);
      const close = parseFloat(kline[4]);
      const volume = parseFloat(kline[5]);
      
      candlestickData.push({ time, open, high, low, close });
      
      volumeData.push({
        time,
        value: volume,
        color: close >= open ? VOLUME_COLORS.UP : VOLUME_COLORS.DOWN,
      });
    }

    return { candlestickData, volumeData };
  }, [data]);
};