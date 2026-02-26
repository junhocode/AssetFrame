import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSetAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WS_ENDPOINTS } from "@/ws/url.ws";
import { wsOrderBookAtom } from "@/atoms/wsStatusAtom";
import type { OrderBook } from "@/types/orderBook.type";

export const useOrderBook = (symbol: string) => {
  const queryClient = useQueryClient();
  const setOrderBookStatus = useSetAtom(wsOrderBookAtom);
  const wsUrl = symbol ? WS_ENDPOINTS.orderBook(symbol) : null;

  const { readyState } = useWebSocket(wsUrl, {
    onMessage: (event) => {
      const message = JSON.parse(event.data);

      if (message.bids && message.asks) {
        const newOrderBook: OrderBook = {
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

    filter: () => !!symbol
  });

  const isConnected = readyState === ReadyState.OPEN;

  useEffect(() => {
    setOrderBookStatus(isConnected);
  }, [isConnected, setOrderBookStatus]);
}