import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import useWebSocket from 'react-use-websocket';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { parseWsKlineToRaw } from '@/utils/klineParser';
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

      const newRawKline = parseWsKlineToRaw(message.k);
      const newKlineTime = newRawKline[0]; 

      queryClient.setQueryData<InfiniteData<KlinesData>>(
        QUERY_KEYS.klines.list(params),
        (oldData) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return oldData;
          }

          const newData = {
            ...oldData,
            pages: oldData.pages.map(page => ({
              klines: [...page.klines], 
            })),
          };

          const latestPage = newData.pages[newData.pages.length - 1];

          const existingKlineIndex = latestPage.klines.findIndex(k => k[0] === newKlineTime);

          if (existingKlineIndex !== -1) {
            latestPage.klines[existingKlineIndex] = newRawKline;
          } else {
            latestPage.klines.push(newRawKline);
            latestPage.klines.sort((a,b) => a[0] - b[0]);
          }
  
          return newData;
        }
      );
    },
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });
};     