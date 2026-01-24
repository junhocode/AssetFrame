export const WS_URL = import.meta.env.VITE_BINANCE_WS_URL;

export const WS_ENDPOINTS = {
  orderBook: (symbol: string) => `${WS_URL}/${symbol.toLowerCase()}@depth20@1000ms`,
} as const;