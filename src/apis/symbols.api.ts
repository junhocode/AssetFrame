import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { BinanceRestExchangeInfoResponse } from "@/types/symbol.type";

export const getSymbols = async (): Promise<BinanceRestExchangeInfoResponse> => {
  return fetcher.get<BinanceRestExchangeInfoResponse>({
    url: ENDPOINT.SYMBOL
  });
};