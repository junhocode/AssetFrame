import { useState, useEffect, useMemo, useRef } from "react";
import { calculateIndicators } from "@/utils/indicators";
import type { LineData } from "lightweight-charts";
import type { CandlestickData } from "lightweight-charts";
import type { AllowedIndicator, Indicator } from "@/types/indicator.type";
import type { CandleData } from "@/types/kline.type";

const DEFAULT_CONFIGS: Record<string, Partial<Indicator>> = {
  MACD: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
};

export const useIndicators = (
  candlestickData: CandlestickData[] | undefined,
  period: number,
  onIndicatorChange: (data: Record<string, LineData[]>) => void
) => {
  const [activeConfigs, setActiveConfigs] = useState<Indicator[]>([]);
  const onChangeRef = useRef(onIndicatorChange);
  onChangeRef.current = onIndicatorChange;

  const selectedValues = useMemo(
    () => activeConfigs.map((c) => c.type),
    [activeConfigs]
  );

  const formattedCandles = useMemo<CandleData[]>(() => {
    if (!candlestickData?.length) return [];
    return candlestickData.map((d) => ({
      time: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: (d as CandleData).volume ?? 0,
    }));
  }, [candlestickData]);

  useEffect(() => {
    setActiveConfigs((prev) =>
      prev.map((config) =>
        config.type === "MACD" ? config : { ...config, period }
      )
    );
  }, [period]);

  useEffect(() => {
    if (!formattedCandles.length || !activeConfigs.length) {
      onChangeRef.current({});
      return;
    }

    try {
      const results = calculateIndicators(activeConfigs, formattedCandles);
      const allFormattedData = Object.entries(results).reduce(
        (acc, [key, values]) => {
          acc[key] = values
            .map((value, index) => ({
              value: value ?? undefined,
              time: formattedCandles[index]?.time,
            }))
            .filter(
              (item): item is LineData =>
                item.time !== undefined && item.value !== undefined
            );
          return acc;
        },
        {} as Record<string, LineData[]>
      );
      onChangeRef.current(allFormattedData);
    } catch (error) {
      console.error("Error calculating indicators:", error);
      onChangeRef.current({});
    }
  }, [activeConfigs, formattedCandles]);

  const handleSelectionChange = (newSelectedTypes: string[]) => {
    setActiveConfigs((prev) =>
      newSelectedTypes.map((type) => {
        const existing = prev.find((c) => c.type === type);
        if (existing) return existing;
        return {
          id: crypto.randomUUID(),
          type: type as AllowedIndicator,
          ...DEFAULT_CONFIGS[type],
          period: type === "MACD" ? undefined : period,
        } as Indicator;
      })
    );
  };

  return { selectedValues, handleSelectionChange };
};