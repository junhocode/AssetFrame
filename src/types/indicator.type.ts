export type AllowedIndicator =
  | "SMA"
  | "EMA"
  | "RSI"
  | "MACD"
  | "BollingerBands"
  | "ATR"
  | "OBV"
  | "Stochastic";

export interface Indicator {
  id: string;
  type: AllowedIndicator;
  period?: number;
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
  stdDev?: number;
}

export interface IndicatorResults {
  [id: string]: (number | undefined | any)[];
}
