import type { IChartApi, LineSeriesPartialOptions, CandlestickData } from "lightweight-charts";
import type { GetKlinesParams, KlinesData } from "./kline.type";
import type { InfiniteData } from "@tanstack/react-query";

export interface MovingAverageHookOptions extends LineSeriesPartialOptions {
    length: number;
  }

export interface KlineChartProps {
  params: GetKlinesParams;
  showMA20: boolean;
  showMA60: boolean;
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
  data: InfiniteData<KlinesData> | undefined;
  chartRef: React.RefObject<IChartApi | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}