import { useQuery } from "@tanstack/react-query";
import { getOrderBooks } from "@/apis/orderBook.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { OrderBookResponse } from "@/types/orderBook.type";

export const useOrderBookQuery = (symbol: string) => {
  return useQuery<OrderBookResponse, Error>({
    queryKey: QUERY_KEYS.orderBook.detail(symbol),
    
    queryFn: () => getOrderBooks(symbol),
    
    refetchInterval: false,
    staleTime: 4000,
    refetchOnWindowFocus: true,
  });
};
