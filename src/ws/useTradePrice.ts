import { useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_ENDPOINTS } from "@/ws/url.ws";

export const useTrade = (symbol: string) => {
  const latestPriceRef = useRef<number | null>(null);
  const wsUrl = symbol ? WS_ENDPOINTS.trade(symbol) : null;

  const { readyState } = useWebSocket(wsUrl, {
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "trade" && data.p) latestPriceRef.current = parseFloat(data.p);
    },

    shouldReconnect: () => true
  });

  const isConnected = readyState === ReadyState.OPEN;

  return { latestPriceRef, isConnected };
}