import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { BinanceTicker } from "@/types/ticker.type";

export const getTickers = async (symbols: string[]): Promise<BinanceTicker[]> => {
  return fetcher.get<BinanceTicker[]>({
    url: ENDPOINT.TICKER,
    params: { symbols }
  });
};
