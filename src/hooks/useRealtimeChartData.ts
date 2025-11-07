import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { parseWsKlineToCandle, parseWsKlineToVolume } from '@/utils/klineParser';
import type { GetKlinesParams, KlinesData } from '@/types/kline.type';

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

      const klineData = message.k; 
      
      const newCandle = parseWsKlineToCandle(klineData);
      const newVolume = parseWsKlineToVolume(klineData);

      queryClient.setQueryData<InfiniteData<KlinesData>>(
        QUERY_KEYS.klines.list(params),
        (oldData) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return oldData;
          }

          const newData = {
            ...oldData,
            pages: oldData.pages.map(page => ({
              candles: [...page.candles],
              volumes: [...page.volumes],
            })),
          };

          const latestPage = newData.pages[0];

          const existingCandleIndex = latestPage.candles.findIndex(c => c.time === newCandle.time);
          if (existingCandleIndex !== -1) {
            latestPage.candles[existingCandleIndex] = newCandle;
          } else {
            latestPage.candles.push(newCandle);
          }

          const existingVolumeIndex = latestPage.volumes.findIndex(v => v.time === newVolume.time);
          if (existingVolumeIndex !== -1) {
            latestPage.volumes[existingVolumeIndex] = newVolume;
          } else {
            latestPage.volumes.push(newVolume);
          }
  
          return newData;
        }
      );
    },
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });
};