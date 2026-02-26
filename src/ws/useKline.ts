import useWebSocket, { ReadyState } from "react-use-websocket";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { WS_ENDPOINTS } from "@/ws/url.ws";
import { parseKline } from "@/utils/parseKline";
import type { KlinesParams, Kline } from "@/types/kline.type";

export const useKline = (params: KlinesParams) => {
  const queryClient = useQueryClient();
  const wsUrl = params.symbol ? WS_ENDPOINTS.chartData(params.symbol, params.interval) : null;

  const { readyState } = useWebSocket(wsUrl, {
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      if (message.e !== "kline") return;

      const newRawKline = parseKline(message.k);
      const newKlineTime = newRawKline[0];

      queryClient.setQueryData<InfiniteData<Kline[]>>(
        QUERY_KEYS.klines.list(params),
        (oldData) => {

          // 기존 데이터를 Rest로 받지 않은 상태라면, 새로 받은 Kline을 무시한다.
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return;
          }

          // 새로 받은 데이터를 넣어 새 Kline[] 객체를 복사생성한다.
          const newData: InfiniteData<Kline[]> = {
            ...oldData,
            pages: oldData.pages.map((page) => [...page]),
          };

          const latestPage = newData.pages[newData.pages.length - 1];

          // 방금 받은 데이터가 새로운 캔들인지, 기존 생성된 캔들의 업데이트인지 확인한다.
          const existingKlineIndex = latestPage.findIndex(
            (k) => k[0] === newKlineTime
          );
          
          if (existingKlineIndex !== -1) {
            latestPage[existingKlineIndex] = newRawKline;
          } else {
            latestPage.push(newRawKline);
          }

          return newData;
        }
      );
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

  const isConnected = readyState === ReadyState.OPEN;

  return { isConnected };
};
