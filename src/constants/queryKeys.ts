import type { GetKlinesParams } from "@/types/kline.type";

export const QUERY_KEYS = {
    klines: {
      all: ['klines'] as const, 
      lists: () => [...QUERY_KEYS.klines.all, 'list'] as const,
      list: (params: GetKlinesParams) => [...QUERY_KEYS.klines.lists(), params] as const,
    },
    candles: {
        all: ['candles'] as const,
        lists: () => [...QUERY_KEYS.candles.all, 'list'] as const,
        list: (params: GetKlinesParams) => [...QUERY_KEYS.candles.lists(), params] as const,
    },
    volumes: {
        all: ['volumes'] as const,
        lists: () => [...QUERY_KEYS.volumes.all, 'list'] as const,
        list: (params: GetKlinesParams) => [...QUERY_KEYS.volumes.lists(), params] as const,
    }
};