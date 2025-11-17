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
  { value: "ADL", label: "Accumulation Distribution Line (ADL)" },
  { value: "ADX", label: "Average Directional Index (ADX)" },
  { value: "ATR", label: "Average True Range (ATR)" },
  { value: "AO", label: "Awesome Oscillator (AO)" },
  { value: "BB", label: "Bollinger Bands (BB)" },
  { value: "CCI", label: "Commodity Channel Index (CCI)" },
  { value: "EMA", label: "Exponential Moving Average (EMA)" },
  { value: "FI", label: "Force Index (FI)" },
  { value: "IchimokuCloud", label: "Ichimoku Cloud" },
  { value: "KST", label: "Know Sure Thing (KST)" },
  { value: "MACD", label: "Moving Average Convergence Divergence (MACD)" },
  { value: "MFI", label: "Moneyflow Index (MFI)" },
  { value: "OBV", label: "On Balance Volume (OBV)" },
  { value: "PSAR", label: "Parabolic Stop and Reverse (PSAR)" },
  { value: "ROC", label: "Rate of Change (ROC)" },
  { value: "RSI", label: "Relative Strength Index (RSI)" },
  { value: "SMA", label: "Simple Moving Average (SMA)" },
  { value: "Stoch", label: "Stochastic Oscillator (KD)" },
  { value: "StochRSI", label: "Stochastic RSI (StochRSI)" },
  { value: "TRIX", label: "Triple Exponentially Smoothed Average (TRIX)" },
  { value: "TypicalPrice", label: "Typical Price" },
  { value: "VP", label: "Volume Profile (VP)" },
  { value: "VWAP", label: "Volume Weighted Average Price (VWAP)" },
  { value: "WEMA", label: "Wilder's Smoothing (WEMA)" },
  { value: "WilliamsR", label: "Williams %R (W%R)" },
  { value: "WMA", label: "Weighted Moving Average (WMA)" },
];

export const INITIAL_TOOLTIP_STATE: ChartTooltipProps = {
  top: 0,
  left: 0,
  visible: false,
};
