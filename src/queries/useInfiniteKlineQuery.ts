import { useInfiniteQuery } from "@tanstack/react-query";
import { getKlines } from "@/apis/kline.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { KlinesParams } from "@/types/kline.type";

export const useInfiniteKlinesQuery = (params: KlinesParams) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.klines.list(params),

    queryFn: ({ pageParam }: { pageParam: number | undefined }) => {
      return getKlines({ 
        ...params, 
        endTime: pageParam 
      });
    },

    getNextPageParam: (lastPage) => {
      const limit = params.limit ?? 500;
  
      if (!lastPage || lastPage.length < limit) return undefined;
      
      return lastPage[0][0] - 1;
    },

    initialPageParam: undefined,
    
    enabled: Boolean(params.symbol)
  });
};