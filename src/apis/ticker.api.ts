import fetcher from "./fetcher";
import { ENDPOINT } from "./url.api";
import type { Ticker } from "@/types/ticker.type";

export const getTickers = async (symbols: string[]): Promise<Ticker[]> => {
  return fetcher.get<Ticker[]>({
    url: ENDPOINT.TICKER,
    params: { symbols: JSON.stringify(symbols) }
  });
};
