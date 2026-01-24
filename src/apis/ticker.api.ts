import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { Ticker } from "@/types/ticker.type";

export const getTickers = async (symbols: string[]): Promise<Ticker[]> => {
  const symbolsParam = JSON.stringify(symbols);

  return fetcher.get<Ticker[]>({
    url: ENDPOINT.TICKER,
    params: { symbols: symbolsParam }
  });
};
