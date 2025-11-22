import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WHITELISTED_SYMBOLS } from "@/constants/whiteList";
import { getTickers } from "@/apis/ticker.api";
import type { BinanceTickerData } from "@/types/ticker.type";

export const useSymbolsQuery = () => {
  return useQuery<BinanceTickerData[], Error>({
    queryKey: QUERY_KEYS.symbols.whitelist(),

    queryFn: () => getTickers(WHITELISTED_SYMBOLS),

    refetchInterval: 5000,
    staleTime: 4000,
    refetchOnWindowFocus: true,
  });
};
