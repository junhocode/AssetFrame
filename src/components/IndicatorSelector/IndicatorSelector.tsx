import { useState, useEffect, useMemo } from "react";
import { MultiSelect } from "../ui/multi-select";
import {
  calculateIndicator,
  type IndicatorType,
} from "@/utils/indicatorCalculator";
import { INDICATORS } from "@/constants/configs";
import type { LineData } from "lightweight-charts";
import type { IndicatorSelectorProps } from "@/types/selector.type";
import * as S from "./IndicatorSelector.styles";

export const IndicatorSelector = ({
  candlestickData,
  period,
  onIndicatorChange,
}: IndicatorSelectorProps) => {
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);

  const closePrices = useMemo(() => {
    if (!candlestickData || candlestickData.length === 0) {
      return [];
    }
    return candlestickData.map((d) => d.close);
  }, [candlestickData]);

  useEffect(() => {
    if (
      !candlestickData ||
      candlestickData.length === 0 ||
      selectedIndicators.length === 0
    ) {
      onIndicatorChange({});
      return;
    }

    try {
      const selectedIndicatorTypes = selectedIndicators as IndicatorType[];
      const indicatorResults = calculateIndicator(
        selectedIndicatorTypes,
        closePrices,
        { period }
      );

      const allFormattedData = Object.entries(indicatorResults).reduce(
        (acc, [key, values]) => {
          const formattedData = values
            .map((value, index) => ({
              value,
              time: candlestickData[index].time,
            }))
            .filter((item): item is LineData => item.value !== undefined);

          acc[key] = formattedData;
          return acc;
        },
        {} as { [key: string]: LineData[] }
      );

      onIndicatorChange(allFormattedData);
    } catch (error) {
      console.error(error);
      onIndicatorChange({});
    }
  }, [
    selectedIndicators,
    period,
    candlestickData,
    closePrices,
    onIndicatorChange,
  ]);

  return (
    <div className={S.multiSelectorContainer}>
      <MultiSelect
        options={INDICATORS}
        onValueChange={setSelectedIndicators}
        defaultValue={selectedIndicators}
        placeholder="보조지표를 선택해 주세요.."
        className={S.multiSelector}
        maxCount={1}
        maxWidth="1"
      />
    </div>
  );
};
