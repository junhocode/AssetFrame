export type AllowedIndicator = "SMA" | "EMA" | "RSI" | "MACD" | "BollingerBands" | "ATR" | "Stochastic";

export interface Indicator {
  id: string;
  type: AllowedIndicator;
  period?: number;
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
  stdDev?: number;
}

export type SeriesData = (number | null)[];

export type IndicatorResults = Record<string, SeriesData>;

export type MarketInput = {
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
};

export type IndicatorHandler = (
  config: Indicator,
  input: MarketInput,
  len: number
) => IndicatorResults;