import React, { useState, useEffect } from 'react';
import { calculateIndicator, type IndicatorType } from '@/utils/indicatorCalculator';
import type { CandlestickData, LineData } from 'lightweight-charts';

interface IndicatorSelectorProps {
  candlestickData: CandlestickData[];
  onIndicatorChange: (indicatorData: LineData[]) => void;
}

const IndicatorSelector: React.FC<IndicatorSelectorProps> = ({ candlestickData, onIndicatorChange }) => {
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('SMA');
  const [period, setPeriod] = useState(20);

  useEffect(() => {
    if (!candlestickData || candlestickData.length === 0) {
      onIndicatorChange([]);
      return;
    }

    try {
      const closePrices = candlestickData.map(d => d.close);
      const resultValues = calculateIndicator(selectedIndicator, closePrices, { period });
      
      const offset = candlestickData.length - resultValues.length;
      const formattedIndicatorData: LineData[] = resultValues.map((value, index) => ({
        time: candlestickData[index + offset].time,
        value: value,
      }));
      
      onIndicatorChange(formattedIndicatorData);
    } catch (error) {
      console.error(error);
      onIndicatorChange([]);
    }
  }, [selectedIndicator, period, candlestickData, onIndicatorChange]);

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedIndicator}
        onChange={(e) => setSelectedIndicator(e.target.value as IndicatorType)}
        className="p-2 border rounded"
      >
        <option value="SMA">SMA</option>
        <option value="EMA">EMA</option>
        <option value="WMA">WMA</option>
        <option value="DEMA">DEMA</option>
        <option value="TEMA">TEMA</option>
        <option value="RSI">RSI</option>
      </select>
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