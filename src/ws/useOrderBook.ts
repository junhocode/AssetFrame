import useWebSocket from "react-use-websocket";
import { useSetAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WS_ENDPOINTS } from "@/ws/url.ws";
import { wsAtom } from "@/atoms/wsStatusAtom";
import type { OrderBook } from "@/types/orderBook.type";

export const useOrderBook = (symbol: string) => {
  const queryClient = useQueryClient();
  const setWs = useSetAtom(wsAtom);
  const wsUrl = symbol ? WS_ENDPOINTS.orderBook(symbol) : null;
  
  const handleMessage = (event: MessageEvent) => {
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
  }

  useWebSocket(wsUrl, {
    onOpen: () => setWs((prev) => ({ ...prev, orderBook: "connected" })),
    onClose: () => setWs((prev) => ({ ...prev, orderBook: prev.orderBook === "connected" ? "error" : "connecting" })),
    onError: () => setWs((prev) => ({ ...prev, orderBook: "error" })),
    onMessage: handleMessage,
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    heartbeat: {
      message: "ping",
      returnMessage: "pong",
      timeout: 5000,
      interval: 3000,
    }
  });
};