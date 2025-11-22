import {
  SMA,
  EMA,
  RSI,
  MACD,
  BollingerBands,
  ATR,
  OBV,
  Stochastic,
} from "technicalindicators";
import type { CandleData } from "@/types/kline.type";
import type { Indicator, IndicatorResults } from "@/types/indicator.type";

export const calculateIndicators = (
  configs: Indicator[],
  data: CandleData[]
): IndicatorResults => {
  const results: IndicatorResults = {};
  const calculators: { [id: string]: any } = {};

  configs.forEach((config) => {
    if (config.type === "MACD") {
      results[`${config.id}_macd`] = [];
      results[`${config.id}_signal`] = [];
      results[`${config.id}_histogram`] = [];
    } else if (config.type === "BollingerBands") {
      results[`${config.id}_upper`] = [];
      results[`${config.id}_middle`] = [];
      results[`${config.id}_lower`] = [];
    } else if (config.type === "Stochastic") {
      results[`${config.id}_k`] = [];
      results[`${config.id}_d`] = [];
    } else {
      results[config.id] = [];
    }

    try {
      switch (config.type) {
        case "SMA":
          calculators[config.id] = new SMA({
            values: [],
            period: config.period!,
          });
          break;
        case "EMA":
          calculators[config.id] = new EMA({
            values: [],
            period: config.period!,
          });
          break;
        case "RSI":
          calculators[config.id] = new RSI({
            values: [],
            period: config.period!,
          });
          break;
        case "MACD":
          calculators[config.id] = new MACD({
            values: [],
            fastPeriod: config.fastPeriod!,
            slowPeriod: config.slowPeriod!,
            signalPeriod: config.signalPeriod!,
            SimpleMAOscillator: false,
            SimpleMASignal: false,
          });
          break;
        case "BollingerBands":
          calculators[config.id] = new BollingerBands({
            values: [],
            period: config.period!,
            stdDev: config.stdDev || 2,
          });
          break;
        case "OBV":
          calculators[config.id] = new OBV({ close: [], volume: [] });
          break;
        case "ATR":
          calculators[config.id] = new ATR({
            high: [],
            low: [],
            close: [],
            period: config.period!,
          });
          break;
        case "Stochastic":
          calculators[config.id] = new Stochastic({
            high: [],
            low: [],
            close: [],
            period: config.period || 14,
            signalPeriod: config.signalPeriod || 3,
          });
          break;
      }
    } catch (e) {
      console.error(`[${config.id}] 생성 실패:`, e);
    }
  });

  for (let i = 0; i < data.length; i++) {
    const candle = data[i];

    configs.forEach((config) => {
      const calculator = calculators[config.id];
      if (!calculator) return;

      let result: any;

      if (config.type === "OBV") {
        result = calculator.nextValue({
          close: candle.close,
          volume: candle.volume,
        });
      } else if (config.type === "ATR" || config.type === "Stochastic") {
        result = calculator.nextValue({
          high: candle.high,
          low: candle.low,
          close: candle.close,
        });
      } else {
        result = calculator.nextValue(candle.close);
      }

      if (config.type === "MACD") {
        results[`${config.id}_macd`][i] = result?.MACD;
        results[`${config.id}_signal`][i] = result?.signal;
        results[`${config.id}_histogram`][i] = result?.histogram;
      } else if (config.type === "BollingerBands") {
        results[`${config.id}_upper`][i] = result?.upper;
        results[`${config.id}_middle`][i] = result?.middle;
        results[`${config.id}_lower`][i] = result?.lower;
      } else if (config.type === "Stochastic") {
        results[`${config.id}_k`][i] = result?.k;
        results[`${config.id}_d`][i] = result?.d;
      } else {
        results[config.id][i] = result;
      }
    });
  }

  return results;
};
