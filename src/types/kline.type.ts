import type { CandlestickData, HistogramData, Time } from "lightweight-charts";

export interface BinanceWSKline {
  e: string; // Event type 
  E: number; // Event time    
  s: string; // Symbol     
  a: number; // Aggregate trade ID
  p: string; // Price
  q: string; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
}

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
  interval?: string; 
  limit?: number;    
}

export type CandleData = CandlestickData<Time>;
export type VolumeData = HistogramData<Time>;