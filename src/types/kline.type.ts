import type { CandlestickData, HistogramData, Time } from "lightweight-charts";

export type BinanceRestKline = [
  number,   // Kline open time
  string,   // Open price
  string,   // High price
  string,   // Low price
  string,   // Close price
  string,   // Volume
  number,   // Kline Close time
  string,   // Quote asset volume
  number,   // Number of trades
  string,   // Taker buy base asset volume
  string,   // Taker buy quote asset volume
  string    // Unused field, ignore.
];

export interface GetKlinesParams {
  symbol: string;
  interval: string; 
  limit?: number;    
}

export type CandleData = CandlestickData<Time>;
export type VolumeData = HistogramData<Time>;