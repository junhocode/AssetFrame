import fetcher from "./fetcher";
import { ENDPOINT } from "./url.api";
import type { Kline, KlinesParams } from "@/types/kline.type";

export const getKlines = async (params: KlinesParams): Promise<Kline[]> => {
  return fetcher.get<Kline[]>({
    url: ENDPOINT.KLINE,
    params
  });
};
