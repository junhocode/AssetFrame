import { useRef } from "react";
import useWebSocket from "react-use-websocket";
import { useSetAtom } from "jotai";
import { WS_ENDPOINTS } from "@/ws/url.ws";
import { wsAtom } from "@/atoms/wsStatusAtom";

export const useTradePrice = (symbol: string) => {
  const latestPriceRef = useRef<number | null>(null);
  const setWs = useSetAtom(wsAtom);
  const wsUrl = symbol ? WS_ENDPOINTS.trade(symbol) : null;

  useWebSocket(wsUrl, {
    onOpen: () => setWs((prev) => ({ ...prev, trade: "connected" })),
    onClose: () => setWs((prev) => ({ ...prev, trade: prev.trade === "connected" ? "error" : "connecting" })),
    onError: () => setWs((prev) => ({ ...prev, trade: "error" })),
    onMessage: (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (data.e === "trade" && data.p) latestPriceRef.current = parseFloat(data.p);
    },
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    heartbeat: {
      message: "ping",
      returnMessage: "pong",
      timeout: 5000,
      interval: 3000,
    }
  });

  return { latestPriceRef };
};