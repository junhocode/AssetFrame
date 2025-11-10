import { useMemo } from "react";
import type { KlinesData } from "@/types/kline.type";
import type { InfiniteData } from "@tanstack/react-query";

const useFormattedChartData = (data: InfiniteData<KlinesData> | undefined) => {
  const formattedData = useMemo(() => {
    if (!data?.pages) return { candlestickData: [], volumeData: [] };

    const candlestickData = data?.pages
      .flatMap((page) => page.candles)
      .sort((a, b) => (a.time as number) - (b.time as number));

    const volumeData = data?.pages
      .flatMap((page) => page.volumes)
      .sort((a, b) => (a.time as number) - (b.time as number));

    return { candlestickData, volumeData };
  }, [data]);

  return formattedData;
};

export default useFormattedChartData;
