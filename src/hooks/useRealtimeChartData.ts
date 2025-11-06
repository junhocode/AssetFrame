import { useQueryClient } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { parseWsKlineToCandle, parseWsKlineToVolume } from '@/components/utils/klineParser';
import type { CandleData, VolumeData, GetKlinesParams } from '@/types/kline.type';
import type { BinanceWSKline } from '@/types/ws.type';

const WS_BASE_URL = import.meta.env.VITE_BINANCE_WS_URL;

const getWsUrl = (symbol: string, interval: string) => 
  `${WS_BASE_URL}/${symbol.toLowerCase()}@kline_${interval}`;

export const useRealtimeChartData = (params: GetKlinesParams) => {
  const queryClient = useQueryClient();

  const wsUrl = params.symbol ? getWsUrl(params.symbol, params.interval) : null;

  useWebSocket(wsUrl, {
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      if (message.e !== 'kline') return;

      const kline = message as BinanceWSKline;
      
      const newCandle = parseWsKlineToCandle(kline);
      const newVolume = parseWsKlineToVolume(kline);

      const queryKeyParams = { 
        symbol: params.symbol, 
        interval: params.interval, 
        limit: params.limit 
      };

      queryClient.setQueryData<CandleData[]>(QUERY_KEYS.candles.list(queryKeyParams), (oldData = []) => {
        const lastCandle = oldData.at(-1); 

        if (lastCandle?.time === newCandle.time) {
          return [...oldData.slice(0, -1), newCandle];
        }
        return [...oldData, newCandle];
      });

      queryClient.setQueryData<VolumeData[]>(QUERY_KEYS.volumes.list(queryKeyParams), (oldData = []) => {
        const lastVolume = oldData.at(-1); 

        if (lastVolume?.time === newVolume.time) {
          return [...oldData.slice(0, -1), newVolume];
        }
        return [...oldData, newVolume];
      });
    },
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });
};