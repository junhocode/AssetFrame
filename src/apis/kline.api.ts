import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { Kline, KlinesParams } from "@/types/kline.type";

export const getKlines = async ({ symbol, interval, endTime, limit }: KlinesParams): Promise<Kline[]> => {
  return fetcher.get<Kline[]>({
    url: ENDPOINT.KLINE,
    params: { symbol, interval, endTime, limit }
  });
};
