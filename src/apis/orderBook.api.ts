import type { GetOrderBookResponse } from "@/types/orderBook.type";
import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";

export const getOrderBooks = async (
  symbol: string
): Promise<GetOrderBookResponse> => {
  return fetcher.get<GetOrderBookResponse>({
    url: ENDPOINT.ORDERBOOK,
    params: {
      symbol
    },
  });
};
