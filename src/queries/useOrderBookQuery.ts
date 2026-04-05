import { useQuery } from "@tanstack/react-query";
import { getOrderBooks } from "@/apis/orderBook.api";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useOrderBookQuery = (symbol: string) => {
  // 오더북은 최초 스냅샷만 http로 가져오고 그 후는 ws로 업데이트하나 isLoading 등을 위해 query를 이용한다
  return useQuery({
    queryKey: QUERY_KEYS.orderBook.detail(symbol),
    
    queryFn: () => getOrderBooks(symbol)
  });
};
