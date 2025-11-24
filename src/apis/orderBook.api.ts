import type { GetOrderBookParams, GetOrderBookResponse } from "@/types/orderBook.type";
import fetcher from "./fetcher.api";
import { ENDPOINT } from "./url.api";

export const getOrderBooks = async (
  {symbol}: GetOrderBookParams
): Promise<GetOrderBookResponse> => {
  return fetcher.get<GetOrderBookResponse>({
    url: ENDPOINT.ORDERBOOK,
    params: {
      symbol
    },
  });
};
