import { useInfiniteQuery } from "@tanstack/react-query";
import { getKlines } from "@/apis/klines.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { KlinesParams } from "@/types/kline.type";

export const useInfiniteKlinesQuery = (params: KlinesParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.klines.list(params),

    queryFn: ({ pageParam }) => {
      return getKlines({ 
        ...params, 
        endTime: pageParam as number | undefined 
      });
    },

    getNextPageParam: (lastPage) => {
      if (typeof params.limit === "number" && lastPage.length < params.limit) {
        return undefined;
      }
      if (lastPage.length === 0) return undefined;

      const oldestCandle = lastPage[0];
      if (!oldestCandle) return undefined;

      return oldestCandle[0] - 1;
    },

    initialPageParam: undefined as number | undefined,
    
    enabled: !!params.symbol,
  });
};