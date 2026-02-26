import { useRef, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSetAtom } from "jotai"; 
import { WS_ENDPOINTS } from "@/ws/url.ws";
import { wsTradeAtom } from "@/atoms/wsStatusAtom"; 

export const useTradePrice = (symbol: string) => {
  const latestPriceRef = useRef<number | null>(null);
  const setTradeStatus = useSetAtom(wsTradeAtom); 
  const wsUrl = symbol ? WS_ENDPOINTS.trade(symbol) : null;

  const { readyState } = useWebSocket(wsUrl, {
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.e === "trade" && data.p) latestPriceRef.current = parseFloat(data.p);
    },

    shouldReconnect: () => true
  });

  const isConnected = readyState === ReadyState.OPEN;

  useEffect(() => {
    setTradeStatus(isConnected);
  }, [isConnected, setTradeStatus]);

  return { latestPriceRef };
}