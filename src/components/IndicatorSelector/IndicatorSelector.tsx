import { useState, useEffect } from 'react';
import { calculateIndicator, type IndicatorType } from '@/utils/indicatorCalculator';
import { MultiSelect } from '../ui/multi-select';
import type { CandlestickData, LineData } from 'lightweight-charts';

interface IndicatorSelectorProps {
  candlestickData: CandlestickData[];
  onIndicatorChange: (indicatorData: { [key: string]: LineData[] }) => void;
}

const IndicatorSelector: React.FC<IndicatorSelectorProps> = ({ candlestickData, onIndicatorChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [period, setPeriod] = useState(20);

  const indicatorOptions = [
    { value: "SMA", label: "SMA" },
    { value: "EMA", label: "EMA" },
    { value: "WMA", label: "WMA" },
    { value: "RSI", label: "RSI" }
  ];

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
    <div className="flex items-center gap-2">
      <MultiSelect 
        options={indicatorOptions}
        onValueChange={setSelectedValues}
        defaultValue={selectedValues}
        placeholder="Select indicators"
      />
      <input
        type="number"
        value={period}
        onChange={(e) => setPeriod(parseInt(e.target.value, 10) || 1)}
        min="1"
        className="p-2 border rounded w-20"
      />
    </div>
  );
};

export default IndicatorSelector;