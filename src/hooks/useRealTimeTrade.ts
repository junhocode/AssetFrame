import { useRef } from "react";
import useWebSocket from "react-use-websocket";

const WS_BASE_URL = import.meta.env.VITE_BINANCE_WS_URL;

export const useRealTimeTrade = (symbol: string) => {
  const latestPriceRef = useRef<number | null>(null);

  const wsUrl = symbol ? `${WS_BASE_URL}/${symbol.toLowerCase()}@trade` : null;

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
