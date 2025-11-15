import type { IChartApi, LineSeriesPartialOptions, CandlestickData, LineData } from "lightweight-charts";
import type { KlinesData } from "./kline.type";
import type { InfiniteData } from "@tanstack/react-query";

export interface MovingAverageHookOptions extends LineSeriesPartialOptions {
    length: number;
  }

  export interface KlineChartProps {
    data: InfiniteData<KlinesData> | undefined;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    params: {
      symbol: string;
      interval: string;
      limit: number;
    };
    indicatorData: { [key: string]: LineData[] };
  }

export interface MovingAverageFunctionProps {
  candleData: CandlestickData[];
  maLength: number;
}

export interface MovingAverageHookProps {
  chart: IChartApi | null,
  data: CandlestickData[],
  options: MovingAverageHookOptions,
  visible: boolean
}

export interface InfiniteScrollParams {
  chartRef: React.RefObject<IChartApi | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}