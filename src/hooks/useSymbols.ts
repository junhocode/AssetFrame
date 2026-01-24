import { useMemo } from "react";
import { useTickersQuery } from "@/queries/useTickersQuery";
import { WHITELISTED_CRYPTOS } from "@/constants/whiteList";
import type { BinanceTicker } from "@/types/ticker.type";
import type { Symbol } from "@/types/symbol.type";

export const useSymbols = (searchQuery: string) => {
  const { data: tickersData, isLoading, isError } = useTickersQuery();

  const allSymbols: Symbol[] = useMemo(() => {
    if (!tickersData || tickersData.length === 0) {
      return WHITELISTED_CRYPTOS.map((coin) => ({
        ...coin,
        value: coin.symbol,
      }));
    }

    const tickersMap = new Map<string, BinanceTicker>(
      tickersData.map((ticker) => [ticker.symbol, ticker])
    );

    return WHITELISTED_CRYPTOS.map((coin) => {
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
