import { useState, useEffect, useMemo } from "react";
import { MultiSelect } from "../ui/multi-select";
import { calculateIndicators } from "@/utils/indicatorCalculator";
import { INDICATORS } from "@/constants/configs";
import type { LineData } from "lightweight-charts";
import type { IndicatorSelectorProps } from "@/types/selector.type";
import type { AllowedIndicator, Indicator } from "@/types/indicator.type";
import type { CandleData } from "@/types/kline.type";
import * as S from "./IndicatorSelector.styles";

const DEFAULT_CONFIGS: Record<string, Partial<Indicator>> = {
  MACD: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
};

export const IndicatorSelector = ({
  candlestickData,
  period,
  onIndicatorChange,
}: IndicatorSelectorProps) => {
  const [activeConfigs, setActiveConfigs] = useState<Indicator[]>([]);

  const selectedValues = useMemo(
    () => activeConfigs.map((c) => c.type),
    [activeConfigs]
  );

  const formattedCandles = useMemo<CandleData[]>(() => {
    if (!candlestickData || candlestickData.length === 0) return [];

    return candlestickData.map((d) => ({
      time: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: (d as any).volume ?? 0,
    }));
  }, [candlestickData]);

  useEffect(() => {
    setActiveConfigs((prevConfigs) =>
      prevConfigs.map((config) => {
        if (config.type === "MACD") return config;
        return { ...config, period: period };
      })
    );
  }, [period]);

  const handleSelectionChange = (newSelectedTypes: string[]) => {
    setActiveConfigs((prevConfigs) => {
      return newSelectedTypes.map((type) => {
        const existing = prevConfigs.find((c) => c.type === type);
        if (existing) {
          return existing;
        }

        return {
          id: `${type}_${Date.now()}`,
          type: type as AllowedIndicator,
          ...DEFAULT_CONFIGS[type],
          period: type === "MACD" ? undefined : period,
        } as Indicator;
      });
    });
  };

  useEffect(() => {
    if (!formattedCandles.length || activeConfigs.length === 0) {
      onIndicatorChange({});
      return;
    }

    try {
      const results = calculateIndicators(activeConfigs, formattedCandles);

      const allFormattedData = Object.entries(results).reduce(
        (acc, [key, values]) => {
          const formattedData = values
            .map((value, index) => ({
              value: value ?? undefined,
              time: formattedCandles[index]?.time,
            }))
            .filter(
              (item): item is LineData =>
                item.time !== undefined && item.value !== undefined
            );

          acc[key] = formattedData;
          return acc;
        },
        {} as { [key: string]: LineData[] }
      );

      onIndicatorChange(allFormattedData);
    } catch (error) {
      console.error("지표 계산 중 오류 발생:", error);
      onIndicatorChange({});
    }
  }, [activeConfigs, formattedCandles, onIndicatorChange]);

  return (
    <div className={S.multiSelectorContainer}>
      <MultiSelect
        options={INDICATORS}
        onValueChange={handleSelectionChange}
        defaultValue={selectedValues}
        placeholder="보조지표를 선택해 주세요.."
        className={S.multiSelector}
        maxCount={1}
        maxWidth="1"
      />
    </div>
  );
};
