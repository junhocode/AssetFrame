import type { ChartTooltipProps } from "@/types/chart.type";
import type {
  DeepPartial,
  CandlestickSeriesPartialOptions,
  HistogramSeriesPartialOptions,
  PriceScaleOptions,
} from "lightweight-charts";

export const VOLUME_PRICE_SCALE_ID = "volume-scale";

export const CANDLESTICK_SERIES_OPTIONS: CandlestickSeriesPartialOptions = {
  upColor: "rgba(0, 150, 136, 1)",
  downColor: "rgba(255, 82, 82, 1)",
  borderDownColor: "rgba(255, 82, 82, 1)",
  borderUpColor: "rgba(0, 150, 136, 1)",
  wickDownColor: "rgba(255, 82, 82, 1)",
  wickUpColor: "rgba(0, 150, 136, 1)",
};

export const VOLUME_SERIES_OPTIONS: HistogramSeriesPartialOptions = {
  priceFormat: { type: "volume" },
  priceScaleId: VOLUME_PRICE_SCALE_ID,
};

export const VOLUME_SCALE_OPTIONS: DeepPartial<PriceScaleOptions> = {
  scaleMargins: { top: 0.8, bottom: 0 },
};

export const FETCHPAGE_THRESHOLD = 20;

export const INTERVALS = ["1s", "1m", "15m", "1h", "4h", "1d", "1w", "1M"];

export const INDICATORS = [
  { value: "ATR", label: "Average True Range (ATR)" },
  { value: "BollingerBands", label: "Bollinger Bands (BB)" },
  { value: "EMA", label: "Exponential Moving Average (EMA)" },
  { value: "MACD", label: "Moving Average Convergence Divergence (MACD)" },
  { value: "OBV", label: "On Balance Volume (OBV)" },
  { value: "RSI", label: "Relative Strength Index (RSI)" },
  { value: "SMA", label: "Simple Moving Average (SMA)" },
  { value: "Stochastic", label: "Stochastic Oscillator (KD)" },
];

export const INITIAL_TOOLTIP_STATE: ChartTooltipProps = {
  top: 0,
  left: 0,
  visible: false,
};
