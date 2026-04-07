import { SMA, EMA, RSI, MACD, BollingerBands, ATR, Stochastic } from "technicalindicators";
import type { CandleData } from "@/types/kline.type";
import type { Indicator, IndicatorHandler, IndicatorResults, MarketInput } from "@/types/indicator.type";

const padDataWithNull = <T>(data: T[], totalLength: number): (T | null)[] => {
  const missingCount = totalLength - data.length;
  if (missingCount <= 0) return data;
  return [...new Array(missingCount).fill(null), ...data];
};

const createSimpleHandler = (
  Calculator: { calculate: (input: { period: number; values: number[] }) => number[] }
): IndicatorHandler => (config, input, len) => {
  const period = config.period ?? 14;
  const res = Calculator.calculate({ period, values: input.close });
  return { [config.id]: padDataWithNull(res, len) };
};

const handleATR: IndicatorHandler = (config, input, len) => {
  const res = ATR.calculate({
    period: config.period ?? 14,
    high: input.high,
    low: input.low,
    close: input.close,
  });
  return { [config.id]: padDataWithNull(res, len) };
};

const handleMACD: IndicatorHandler = (config, input, len) => {
  const raw = MACD.calculate({
    values: input.close,
    fastPeriod: config.fastPeriod ?? 12,
    slowPeriod: config.slowPeriod ?? 26,
    signalPeriod: config.signalPeriod ?? 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });
  const aligned = padDataWithNull(raw, len);
  return {
    [`${config.id}_macd`]: aligned.map((v) => v?.MACD ?? null),
    [`${config.id}_signal`]: aligned.map((v) => v?.signal ?? null),
    [`${config.id}_histogram`]: aligned.map((v) => v?.histogram ?? null),
  };
};

const handleBollinger: IndicatorHandler = (config, input, len) => {
  const raw = BollingerBands.calculate({
    period: config.period ?? 20,
    stdDev: config.stdDev ?? 2,
    values: input.close,
  });
  const aligned = padDataWithNull(raw, len);
  return {
    [`${config.id}_upper`]: aligned.map((v) => v?.upper ?? null),
    [`${config.id}_middle`]: aligned.map((v) => v?.middle ?? null),
    [`${config.id}_lower`]: aligned.map((v) => v?.lower ?? null),
  };
};

const handleStochastic: IndicatorHandler = (config, input, len) => {
  const raw = Stochastic.calculate({
    high: input.high,
    low: input.low,
    close: input.close,
    period: config.period ?? 14,
    signalPeriod: config.signalPeriod ?? 3,
  });
  const aligned = padDataWithNull(raw, len);
  return {
    [`${config.id}_k`]: aligned.map((v) => v?.k ?? null),
    [`${config.id}_d`]: aligned.map((v) => v?.d ?? null),
  };
};

const INDICATOR_STRATEGIES: Record<string, IndicatorHandler> = {
  SMA: createSimpleHandler(SMA),
  EMA: createSimpleHandler(EMA),
  RSI: createSimpleHandler(RSI),
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
    if (!handler) return acc;

    try {
      Object.assign(acc, handler(config, input, len));
    } catch (e) {
      console.error(`Indicator ${config.id} failed:`, e);
    }
    return acc;
  }, {});
};