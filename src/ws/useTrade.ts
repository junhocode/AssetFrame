import { useRef } from "react";
import useWebSocket from "react-use-websocket";
import { WS_ENDPOINTS } from "@/constants/ws";

export const useTrade = (symbol: string) => {
  const latestPriceRef = useRef<number | null>(null);
  const wsUrl = symbol ? WS_ENDPOINTS.trade(symbol) : null;

  useWebSocket(wsUrl, {
    onMessage: (event) => {
      const tradeData = JSON.parse(event.data);
      if (tradeData.e === "trade" && tradeData.p) {
        latestPriceRef.current = parseFloat(tradeData.p);
      }
    },
    shouldReconnect: () => true,
  });

  return latestPriceRef;
};
