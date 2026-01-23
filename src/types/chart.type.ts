import type {
  IChartApi,
  CandlestickData,
  LineData,
  Time,
} from "lightweight-charts";
import type { InfiniteData } from "@tanstack/react-query";
import type { BinanceRestKline } from "@/types/kline.type";

export interface ChartProps {
  data: InfiniteData<BinanceRestKline[]> | undefined;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  params: {
    symbol: string;
    interval: string;
    limit: number;
  };
  indicatorData: { [key: string]: LineData[] };
}

export interface InfiniteScrollParams {
  chartRef: React.RefObject<IChartApi | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export interface ChartTooltipProps {
  top: number;
  left: number;
  candle?: CandlestickData;
  time?: Time;
  visible: boolean;
}
