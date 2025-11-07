import {
  useInfiniteQuery,
  type QueryKey,
  type InfiniteData,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getKlines } from "@/apis/klines.api";
import {
  parseRestKlineToCandle,
  parseRestKlineToVolume,
} from "@/utils/klineParser";
import type { GetKlinesParams } from "@/types/kline.type";
import type { KlinesData } from "@/types/kline.type";

export const useInfiniteKlinesQuery = (params: GetKlinesParams) => {
  return useInfiniteQuery<
    KlinesData,
    Error,
    InfiniteData<KlinesData>,
    QueryKey,
    number | undefined
  >({
    queryKey: QUERY_KEYS.klines.list(params),

    queryFn: async ({ pageParam }) => {
      const rawData = await getKlines({ ...params, endTime: pageParam });
      const sortedData = rawData.sort((a, b) => a[0] - b[0]);
      
      const candles = sortedData.map(parseRestKlineToCandle);
      const volumes = sortedData.map(parseRestKlineToVolume);
      return { candles, volumes };
    },

    getNextPageParam: (lastPage) => {
      const lastCandles = lastPage.candles;

      if (typeof params.limit !== "number" || lastCandles.length < params.limit) {
        return undefined;
      }
      
      const oldestCandleTime = lastCandles[0]?.time as number;

      if (!oldestCandleTime) {
        return undefined;
      }

      return oldestCandleTime - 1;
    },

    initialPageParam: undefined,
    enabled: !!params.symbol && typeof params.limit === "number",
  });
};