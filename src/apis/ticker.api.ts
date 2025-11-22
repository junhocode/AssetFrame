import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { BinanceTickerData } from "@/types/ticker.type";

export const getTickers = async (
  symbols: string[]
): Promise<BinanceTickerData[]> => {
  const symbolsParam = JSON.stringify(symbols);

  return fetcher.get<BinanceTickerData[]>({
    url: ENDPOINT.TICKER,
    params: {
      symbols: symbolsParam,
    },
  });
};
