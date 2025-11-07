import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getKlines } from "@/apis/klines.api";
import {
  parseRestKlineToCandle,
  parseRestKlineToVolume,
} from "@/components/utils/klineParser";
import type { GetKlinesParams } from "@/types/kline.type";

export const useInfiniteCandlesQuery = (params: GetKlinesParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.candles.list(params),

    queryFn: async ({ pageParam }) => {
      const rawData = await getKlines({ ...params, endTime: pageParam });
      const parsedData = rawData.map(parseRestKlineToCandle);
      return parsedData;
    },

    getNextPageParam: (lastPage) => {
      if (typeof params.limit !== "number") {
        return undefined;
      }
      if (lastPage.length < params.limit) {
        return undefined;
      }

      const oldestCandleTime = lastPage[0].time as number;

      return oldestCandleTime;
    },

    enabled: !!params.symbol,
  });
};

export const useInfiniteVolumesQuery = (params: GetKlinesParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.volumes.list(params),

    queryFn: async () => {
      const rawData = await getKlines(params);
      const parsedData = rawData.map(parseRestKlineToVolume);
      return parsedData;
    },

    getNextPageParam: (lastPage) => {
      if (typeof params.limit !== "number") {
        return undefined;
      }
      if (lastPage.length < params.limit) {
        return undefined;
      }

      const oldestVolumeTime = lastPage[0].time as number;

      return oldestVolumeTime;
    },

    enabled: !!params.symbol,
  });
};
