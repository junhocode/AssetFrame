import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";
import type { OrderBook } from "@/types/orderBook.type";

export const getOrderBooks = async (symbol: string): Promise<OrderBook> => {
  return fetcher.get<OrderBook>({
    url: ENDPOINT.ORDERBOOK,
    params: { symbol }
  });
};
