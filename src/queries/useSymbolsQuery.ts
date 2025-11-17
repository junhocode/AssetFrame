import { useQuery } from "@tanstack/react-query";
import { getSymbols } from "@/apis/symbols.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type {
  BinanceRestExchangeInfoResponse,
  SymbolData,
} from "@/types/symbol.type";

export const useSymbolsQuery = () => {
  return useQuery<BinanceRestExchangeInfoResponse, Error, SymbolData[]>({
    queryKey: QUERY_KEYS.symbols.list(),

    queryFn: getSymbols,

    select: (data) => {
      const symbolsArray = data.symbols;

      if (!Array.isArray(symbolsArray)) {
        return [];
      }

      const activeSymbols = symbolsArray.filter(
        (s) =>
          s.status === "TRADING" &&
          s.isSpotTradingAllowed &&
          s.quoteAsset === "USDT"
      );

      const formattedSymbols: SymbolData[] = activeSymbols.map((s) => ({
        value: s.symbol,
        label: `${s.baseAsset}/${s.quoteAsset}`,
      }));

      return formattedSymbols;
    },

    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
