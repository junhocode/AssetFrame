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
        const data = [...oldData];
        const existingCandleIndex = data.findIndex(candle => candle.time === newCandle.time);

        if (existingCandleIndex !== -1) {
          data[existingCandleIndex] = newCandle;
        } else {
          data.push(newCandle);
        }

        return data.sort((a, b) => +a.time - +b.time);
      });

      queryClient.setQueryData<VolumeData[]>(QUERY_KEYS.volumes.list(queryKeyParams), (oldData = []) => {
        const data = [...oldData];
        const existingVolumeIndex = data.findIndex(item => item.time === newVolume.time);

        if (existingVolumeIndex !== -1) {
          data[existingVolumeIndex] = newVolume;
        } else {
          data.push(newVolume);
        }

        return data.sort((a, b) => +a.time - +b.time);
      });
    },
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });
};