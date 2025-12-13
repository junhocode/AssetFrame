import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { BinanceTicker } from "@/types/ticker.type";

export const getTickers = async (symbols: string[]): Promise<BinanceTicker[]> => {
  const symbolsParam = JSON.stringify(symbols);

  return fetcher.get<BinanceTicker[]>({
    url: ENDPOINT.TICKER,
    params: { symbols: symbolsParam }
  });
};
