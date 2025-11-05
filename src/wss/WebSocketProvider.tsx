import React, { createContext, useContext, useEffect, useState } from "react";

interface MessageData {
  stream: string;
  data: Record<string, any>;
}

interface WebSocketContextType {
  lastMessage: MessageData | null;
  isConnected: boolean;
}

const BINANCE_URL = import.meta.env.VITE_BINANCE_URL;

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket은 WebSocketProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastMessage, setLastMessage] = useState<MessageData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!BINANCE_URL) {
      console.error("VITE_BINANCE_URL이 설정되지 않았습니다.");
      return;
    }

    const ws = new WebSocket(BINANCE_URL);

    ws.onopen = () => {
      console.log("WebSocket 연결 성공!");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data) as MessageData;
        setLastMessage(parsedData);
      } catch (error) {
        console.error("WebSocket 메시지 파싱 오류:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket 연결 오류:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket 연결 종료.");
      setIsConnected(false);
    };
    
    return () => {
      ws.close();
    };
  }, []); 

  const value = { lastMessage, isConnected };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};