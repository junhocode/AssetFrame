import type { CandlestickData, HistogramData, Time } from "lightweight-charts";

export type Kline = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Unused field, ignore.
];

export interface WSKline {
  e: string;
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: string;
    f: number;
    L: number;
    o: string;
    c: string;
    h: string;
    l: string;
    v: string;
    n: number;
    x: boolean;
    q: string;
    V: string;
    Q: string;
    B: string;
  };
}

export interface KlinesParams {
  symbol: string;
  interval: string;
  endTime?: number;
  limit?: number;
}

export type CandleData = CandlestickData<Time> & {
  volume: number;
};

export type VolumeData = HistogramData<Time>;

