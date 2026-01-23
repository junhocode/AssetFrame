import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { OrderBookResponse } from "@/types/orderBook.type";

export const getOrderBooks = async (symbol: string): Promise<OrderBookResponse> => {
  return fetcher.get<OrderBookResponse>({
    url: ENDPOINT.ORDERBOOK,
    params: { symbol }
  });
};
