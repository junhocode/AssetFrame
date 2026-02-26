import { useQuery } from "@tanstack/react-query";
import { getTickers } from "@/apis/ticker.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WHITELISTED_SYMBOLS } from "@/constants/whiteList";

export const useTickerQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.symbols.whitelist(),

    queryFn: () => getTickers(WHITELISTED_SYMBOLS)
  });
};
