import { useQuery } from "@tanstack/react-query";
import { getTickers } from "@/apis/ticker.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WHITELISTED_SYMBOLS } from "@/constants/whiteList";

export const useTickerQuery = () => {
  // 티커는 최초 스냅샷만 http로 가져오고 그 후는 ws로 업데이트하나 isLoading 등을 위해 query를 이용한다
  return useQuery({
    queryKey: QUERY_KEYS.symbols.whitelist(),

    queryFn: () => getTickers(WHITELISTED_SYMBOLS)
  });
};
