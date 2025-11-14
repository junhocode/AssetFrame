import { sma, ema, wma, rsi, macd } from 'technicalindicators';

export type IndicatorType = 'SMA' | 'EMA' | 'WMA' | 'DEMA' | 'TEMA' | 'RSI' | 'MACD';

export interface IndicatorOptions {
  period?: number;
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
}

export const calculateIndicator = (
  indicatorType: IndicatorType,
  data: number[],
  options: IndicatorOptions
) => {
  switch (indicatorType) {
    case 'SMA':
      if (!options.period) throw new Error('SMA에는 period가 필요합니다.');
      return sma({ values: data, period: options.period });

    case 'EMA':
      if (!options.period) throw new Error('EMA에는 period가 필요합니다.');
      return ema({ values: data, period: options.period });
    
    case 'WMA':
      if (!options.period) throw new Error('WMA에는 period가 필요합니다.');
      return wma({ values: data, period: options.period });

    case 'RSI':
      if (!options.period) throw new Error('RSI에는 period가 필요합니다.');
      return rsi({ values: data, period: options.period });

    case 'MACD':
      if (!options.fastPeriod || !options.slowPeriod || !options.signalPeriod) {
        throw new Error('MACD에는 fastPeriod, slowPeriod, signalPeriod가 모두 필요합니다.');
      }
      return macd({
        values: data,
        fastPeriod: options.fastPeriod,
        slowPeriod: options.slowPeriod,
        signalPeriod: options.signalPeriod,
        SimpleMAOscillator: false,
        SimpleMASignal: false
      });

    default:
      console.error(`${indicatorType}는 지원하지 않는 보조지표입니다.`);
      return [];
  }
};