import type { CandlestickData, HistogramData, Time } from "lightweight-charts";

export type BinanceRestKline = [
  number,   
  string,  
  string,   
  string,  
  string,   
  string, 
  number,   
  string,   
  number,   
  string,   
  string,   
  string   
];

export interface GetKlinesParams {
  symbol: string;
  interval?: string; 
  limit?: number;    
}

export type CandleData = CandlestickData<Time>;
export type VolumeData = HistogramData<Time>;