import { useMemo } from "react";
import { useTickerQuery } from "@/queries/useTickerQuery";
import { WHITELISTED_CRYPTOS } from "@/constants/whiteList";
import type { DisplayTicker } from "@/types/ticker.type";

export const useTickers = () => {
  const { data: tickersData, isLoading, isError } = useTickerQuery();

  const allTickers: DisplayTicker[] = useMemo(() => {
    if (!tickersData) {
      return WHITELISTED_CRYPTOS.map(coin => ({ ...coin, value: coin.symbol }));
    }

    const tickersMap = new Map(tickersData.map((t) => [t.symbol, t]));

    return WHITELISTED_CRYPTOS.map((coin) => {
      const ticker = tickersMap.get(coin.symbol);
      
      return {
        ...coin,
        value: coin.symbol,
        lastPrice: ticker?.lastPrice,
        priceChangePercent: ticker?.priceChangePercent,
      };
    });
  }, [tickersData]);

  return { allTickers, isLoading, isError };
};
