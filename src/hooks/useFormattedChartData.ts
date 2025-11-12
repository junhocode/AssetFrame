import { useMemo } from "react";
import type { KlinesData } from "@/types/kline.type";
import type { InfiniteData } from "@tanstack/react-query";
import type { CandlestickData, HistogramData, UTCTimestamp } from "lightweight-charts";

const useFormattedChartData = (data: InfiniteData<KlinesData> | undefined) => {
  const formattedData = useMemo(() => {
    if (!data?.pages || data.pages.length === 0) {
      return { candlestickData: [], volumeData: [] };
    }

    const combinedRawKlines = data.pages.flatMap((page) => page.klines);

    combinedRawKlines.sort((a, b) => a[0] - b[0]);

    const uniqueKlines = combinedRawKlines.filter(
      (kline, idx, arr) => idx === 0 || kline[0] !== arr[idx - 1][0]
    );

    const candlestickData: CandlestickData[] = [];
    const volumeData: HistogramData[] = [];

    uniqueKlines.forEach((kline) => {
      const time = kline[0] / 1000 as UTCTimestamp;
      const open = parseFloat(kline[1]);
      const high = parseFloat(kline[2]);
      const low = parseFloat(kline[3]);
      const close = parseFloat(kline[4]);
      const volume = parseFloat(kline[5]);

      candlestickData.push({ time, open, high, low, close });
      volumeData.push({
        time,
        value: volume,
        color: close >= open ? "rgba(0, 150, 136, 0.8)" : "rgba(255, 82, 82, 0.8)",
      });
    });

    return { candlestickData, volumeData };
  }, [data]);

  return formattedData;
};

export default useFormattedChartData;
