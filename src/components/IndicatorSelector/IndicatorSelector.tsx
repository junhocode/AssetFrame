import { useState, useEffect } from 'react';
import { MultiSelect } from '../ui/multi-select';
import { calculateIndicator, type IndicatorType } from '@/utils/indicatorCalculator';
import type { CandlestickData, LineData } from 'lightweight-charts';
import { INDICATORS } from '@/constants/configs';

interface IndicatorSelectorProps {
  candlestickData: CandlestickData[];
  period: number;
  onIndicatorChange: (indicatorData: { [key: string]: LineData[] }) => void;
}

export const IndicatorSelector: React.FC<IndicatorSelectorProps> = ({ candlestickData, period, onIndicatorChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
  useEffect(() => {
    if (!candlestickData || candlestickData.length === 0 || selectedValues.length === 0) {
      onIndicatorChange({});
      return;
    }

    try {
      const closePrices = candlestickData.map(d => d.close);
      const selectedIndicatorTypes = selectedValues as IndicatorType[];
      const indicatorResults = calculateIndicator(selectedIndicatorTypes, closePrices, { period });

      const allFormattedData: { [key: string]: LineData[] } = {};

      for (const indicatorKey in indicatorResults) {
        const values = indicatorResults[indicatorKey];
        const formattedData: LineData[] = [];

        for (let i = 0; i < values.length; i++) {
            if (values[i] !== undefined) {
                formattedData.push({
                    time: candlestickData[i].time,
                    value: values[i]!,
                });
            }
        }
        allFormattedData[indicatorKey] = formattedData;
      }
      
      onIndicatorChange(allFormattedData);
    } catch (error) {
      console.error("보조지표 계산 중 오류 발생:", error);
      onIndicatorChange({});
    }
  }, [selectedValues, period, candlestickData, onIndicatorChange]);

  return (
    <div className="flex items-center">
      <MultiSelect 
        options={INDICATORS}
        onValueChange={setSelectedValues}
        defaultValue={selectedValues}
        placeholder="Select indicators"
        className="h-9 min-h-9"
        maxCount={1}
        maxWidth='1'
      />
    </div>
  );
};