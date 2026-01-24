import { useQuery } from "@tanstack/react-query";
import { getTickers } from "@/apis/ticker.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WHITELISTED_SYMBOLS } from "@/constants/whiteList";
import type { Ticker } from "@/types/ticker.type";

export const useTickersQuery = () => {
  return useQuery<Ticker[], Error>({
    queryKey: QUERY_KEYS.symbols.whitelist(),

    queryFn: () => getTickers(WHITELISTED_SYMBOLS),
    
    refetchOnWindowFocus: true,
  });
};
