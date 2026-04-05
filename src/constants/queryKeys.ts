import type { KlinesParams } from "@/types/kline.type";

export const QUERY_KEYS = {
  klines: {
    all: ["klines"] as const,
    list: (params: KlinesParams) => ["klines", "list", params] as const,
  },
  symbols: {
    whitelist: () => ["symbols", "whitelist"] as const,
  },
  orderBook: {
    detail: (symbol: string) => ["orderBook", symbol] as const,
  },
};