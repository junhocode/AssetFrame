import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { BinanceRestKline, GetKlinesParams } from "@/types/kline.type"

export const getKlines = async ({ symbol, interval, endTime, limit }: GetKlinesParams): Promise<BinanceRestKline[]> => {
  return fetcher.get<BinanceRestKline[]>({
    url: ENDPOINT.KLINE,
    params: { symbol, interval, endTime, limit }
  });
};