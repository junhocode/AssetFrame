import { SMA, EMA, RSI, MACD, BollingerBands, ATR, Stochastic } from "technicalindicators";
import type { CandleData } from "@/types/kline.type";
import type { Indicator, IndicatorHandler, SeriesData, IndicatorResults, MarketInput } from "@/types/indicator.type";

const padDataWithNull = (data: any[], totalLength: number): SeriesData => {
  const missingCount = totalLength - data.length;
  if (missingCount <= 0) return data;
  return [...new Array(missingCount).fill(null), ...data];
};

const handleSMA: IndicatorHandler = (config, input, len) => {
  const res = SMA.calculate({ period: config.period!, values: input.close });
  return { [config.id]: padDataWithNull(res, len) };
};

const handleEMA: IndicatorHandler = (config, input, len) => {
  const res = EMA.calculate({ period: config.period!, values: input.close });
  return { [config.id]: padDataWithNull(res, len) };
};

const handleRSI: IndicatorHandler = (config, input, len) => {
  const res = RSI.calculate({ period: config.period!, values: input.close });
  return { [config.id]: padDataWithNull(res, len) };
};

const handleATR: IndicatorHandler = (config, input, len) => {
  const res = ATR.calculate({
    period: config.period!,
    high: input.high,
    low: input.low,
    close: input.close,
  });
  return { [config.id]: padDataWithNull(res, len) };
};

const handleMACD: IndicatorHandler = (config, input, len) => {
  const raw = MACD.calculate({
    values: input.close,
    fastPeriod: config.fastPeriod!,
    slowPeriod: config.slowPeriod!,
    signalPeriod: config.signalPeriod!,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });
  const aligned = padDataWithNull(raw, len);
  return {
    [`${config.id}_macd`]: aligned.map((v: any) => v?.MACD ?? null),
    [`${config.id}_signal`]: aligned.map((v: any) => v?.signal ?? null),
    [`${config.id}_histogram`]: aligned.map((v: any) => v?.histogram ?? null),
  };
};

const handleBollinger: IndicatorHandler = (config, input, len) => {
  const raw = BollingerBands.calculate({
    period: config.period!,
    stdDev: config.stdDev || 2,
    values: input.close,
  });
  const aligned = padDataWithNull(raw, len);
  return {
    [`${config.id}_upper`]: aligned.map((v: any) => v?.upper ?? null),
    [`${config.id}_middle`]: aligned.map((v: any) => v?.middle ?? null),
    [`${config.id}_lower`]: aligned.map((v: any) => v?.lower ?? null),
  };
};

const handleStochastic: IndicatorHandler = (config, input, len) => {
  const raw = Stochastic.calculate({
    high: input.high,
    low: input.low,
    close: input.close,
    period: config.period || 14,
    signalPeriod: config.signalPeriod || 3,
  });
  const aligned = padDataWithNull(raw, len);
  return {
    [`${config.id}_k`]: aligned.map((v: any) => v?.k ?? null),
    [`${config.id}_d`]: aligned.map((v: any) => v?.d ?? null),
  };
};

const INDICATOR_STRATEGIES: Record<string, IndicatorHandler> = {
  SMA: handleSMA,
  EMA: handleEMA,
  RSI: handleRSI,
  MACD: handleMACD,
  BollingerBands: handleBollinger,
  ATR: handleATR,
  Stochastic: handleStochastic,
};

export const calculateIndicators = (
  configs: Indicator[],
  data: CandleData[]
): IndicatorResults => {
  const input: MarketInput = {
    high: data.map((d) => d.high),
    low: data.map((d) => d.low),
    close: data.map((d) => d.close),
    volume: data.map((d) => d.volume ?? 0),
  };
  const len = data.length;

  return configs.reduce<IndicatorResults>((acc, config) => {
    const handler = INDICATOR_STRATEGIES[config.type];

    if (!handler) {
      return acc;
    }

    try {
      const result = handler(config, input, len);
      return { ...acc, ...result };
    } catch (e) {
      console.error(e);
      return acc;
    }
  }, {});
};