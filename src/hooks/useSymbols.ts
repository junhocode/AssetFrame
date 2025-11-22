import { useMemo } from "react";
import { useSymbolsQuery } from "@/queries/useSymbolsQuery";
import { COIN_WHITELIST } from "@/constants/whiteList";
import type { BinanceTickerData } from "@/types/ticker.type";
import type { SymbolData } from "@/types/symbol.type";

export const useSymbols = (searchQuery: string) => {
  const { data: tickersData, isLoading, isError } = useSymbolsQuery();

  const allSymbols: SymbolData[] = useMemo(() => {
    if (!tickersData || tickersData.length === 0) {
      return COIN_WHITELIST.map((coin) => ({
        ...coin,
        value: coin.symbol,
      }));
    }

    const tickersMap = new Map<string, BinanceTickerData>(
      tickersData.map((ticker) => [ticker.symbol, ticker])
    );

    return COIN_WHITELIST.map((coin) => {
      const liveData = tickersMap.get(coin.symbol);

      return {
        ...coin,
        lastPrice: liveData?.lastPrice,
        priceChangePercent: liveData?.priceChangePercent,
      };
    });
  }, [tickersData]);

  const filteredSymbols = useMemo(() => {
    if (!searchQuery) return allSymbols;

    const lowercasedQuery = searchQuery.toLowerCase();
    return allSymbols.filter((symbol) =>
      symbol.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [allSymbols, searchQuery]);

  return { allSymbols, filteredSymbols, isLoading, isError };
};
