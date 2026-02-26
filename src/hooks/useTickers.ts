import { useMemo } from "react";
import { useTickersQuery } from "@/queries/useTickerQuery";
import { WHITELISTED_CRYPTOS } from "@/constants/whiteList";
import type { DisplayTicker } from "@/types/ticker.type";

export const useTickers = () => {
  const { data: tickersData, isLoading, isError } = useTickersQuery();

  const allTickers: DisplayTicker[] = useMemo(() => {
    const tickersMap = new Map(
      tickersData?.map((ticker) => [ticker.symbol, ticker]) || []
    );

    return WHITELISTED_CRYPTOS.map((coin) => ({
      ...coin,
      value: coin.symbol,
      lastPrice: tickersMap.get(coin.symbol)?.lastPrice,
      priceChangePercent: tickersMap.get(coin.symbol)?.priceChangePercent,
    }));
  }, [tickersData]);

  return { allTickers, isLoading, isError };
};
