import { SMA, EMA, WMA, RSI, MACD } from 'technicalindicators';

export type IndicatorType = 'SMA' | 'EMA' | 'WMA' | 'DEMA' | 'TEMA' | 'RSI' | 'MACD';

export interface IndicatorOptions {
  period?: number;
  fastPeriod?: number;
  slowPeriod?: number;
  signalPeriod?: number;
}

export interface IndicatorResults {
  [key: string]: (number | undefined)[]; 
}

export const calculateIndicator = (
  indicatorTypes: IndicatorType[],
  data: number[],
  options: IndicatorOptions
): IndicatorResults => {

  const results: IndicatorResults = {};
  indicatorTypes.forEach(type => {
    if (type === 'MACD') {
      results.MACD_macd = [];
      results.MACD_signal = [];
      results.MACD_histogram = [];
    } else {
      results[type] = [];
    }
  });

  const calculators: any = {};
  indicatorTypes.forEach(type => {
    try {
      switch (type) {
        case 'SMA':
          if (!options.period) throw new Error('SMA period 필요');
          calculators.SMA = new SMA({ values: [], period: options.period });
          break;
        case 'RSI':
          if (!options.period) throw new Error('RSI period 필요');
          calculators.RSI = new RSI({ values: [], period: options.period });
          break;
        case 'MACD':
          if (!options.fastPeriod || !options.slowPeriod || !options.signalPeriod) throw new Error('MACD 옵션 필요');
          calculators.MACD = new MACD({
            values: [],
            fastPeriod: options.fastPeriod,
            slowPeriod: options.slowPeriod,
            signalPeriod: options.signalPeriod,
            SimpleMAOscillator: false,
            SimpleMASignal: false
          });
          break;
      }
    } catch (e) {
      console.error(`${type} 계산기 생성 실패:`, e);
    }
  });

  for (let i = 0; i < data.length; i++) {
    const price = data[i];

    for (const type in calculators) {
      const calculator = calculators[type];
      const result = calculator.nextValue(price);

      if (type === 'MACD') {
        results.MACD_macd[i] = result?.MACD;
        results.MACD_signal[i] = result?.signal;
        results.MACD_histogram[i] = result?.histogram;
      } else if (result !== undefined) {
        results[type][i] = result;
      } else {
        results[type][i] = undefined; 
      }
    }
  }

  return results;
};