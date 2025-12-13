import useWebSocket, { ReadyState } from "react-use-websocket";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import type { OrderBookResponse } from "@/types/orderBook.type";

const WS_BASE_URL = import.meta.env.VITE_BINANCE_WS_URL;

const getOrderBookWsUrl = (symbol: string) =>
  `${WS_BASE_URL}/${symbol.toLowerCase()}@depth50@1000ms`;

export const useRealtimeOrderBook = (symbol: string) => {
  const queryClient = useQueryClient();
  const wsUrl = symbol ? getOrderBookWsUrl(symbol) : null;

  const { readyState } = useWebSocket(wsUrl, {
    onMessage: (event) => {
      const message = JSON.parse(event.data);

      if (message.bids && message.asks) {
        const newOrderBook: OrderBookResponse = {
          lastUpdateId: message.lastUpdateId,
          bids: message.bids,
          asks: message.asks,
        };

        queryClient.setQueryData(
          QUERY_KEYS.orderBook.detail(symbol),
          newOrderBook
        );
      }
    },

    shouldReconnect: () => true,
    reconnectInterval: 3000,
    filter: () => !!symbol,
  });

  const isConnected = readyState === ReadyState.OPEN;

  return { isConnected };
};
