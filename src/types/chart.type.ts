import type { IChartApi, SeriesOptionsCommon, CandlestickData } from "lightweight-charts";
import type { GetKlinesParams } from "./kline.type";

interface MovingAverageHookOptions extends SeriesOptionsCommon {
    length: number;
  }

export interface KlineChartProps {
  params: GetKlinesParams;
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

