import { useInfiniteQuery } from "@tanstack/react-query";
import { getKlines } from "@/apis/klines.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { QueryKey, InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import type { Kline, KlinesParams } from "@/types/kline.type";

export const useInfiniteKlinesQuery = (
  params: KlinesParams,
  options?: Omit<
    UseInfiniteQueryOptions<
      Kline[],
      Error,
      InfiniteData<Kline[]>,
      QueryKey,
      number | undefined
    >,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
) => {
  return useInfiniteQuery<
    Kline[],
    Error,
    InfiniteData<Kline[]>,
    QueryKey,
    number | undefined
  >({
    queryKey: QUERY_KEYS.klines.list(params),

    queryFn: async ({ pageParam }) => {
      const rawData = await getKlines({ ...params, endTime: pageParam });
      return rawData;
    },

    getNextPageParam: (lastPage) => {
      if (
        typeof params.limit !== "number" ||
        lastPage.length < params.limit
      ) {
        return undefined;
      }

      const sortedCandles = [...lastPage].sort((a, b) => a[0] - b[0]);
      const oldestCandleTime = sortedCandles[0]?.[0];

      if (!oldestCandleTime) {
        return undefined;
      }

      return oldestCandleTime - 1;
    },

    initialPageParam: undefined,
    enabled: !!params.symbol && typeof params.limit === "number",

    ...options,
  });
};
