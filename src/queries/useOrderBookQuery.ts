import { useQuery } from "@tanstack/react-query";
import { getOrderBooks } from "@/apis/orderBook.api";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useOrderBookQuery = (symbol: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.orderBook.detail(symbol),
    
    queryFn: () => getOrderBooks(symbol)
  });
};
