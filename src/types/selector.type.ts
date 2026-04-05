import type { CandlestickData, LineData } from "lightweight-charts";

export interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface PriceBadgeProps {
  value: number | string;
  className?: string;
}

export interface IndicatorSelectorProps {
  candlestickData: CandlestickData[];
  period: number;
  onIndicatorChange: (indicatorData: { [key: string]: LineData[] }) => void;
}

export interface PeriodCounterProps {
  period: number;
  setPeriod: (value: number) => void;
  isDisabled: boolean;
}
