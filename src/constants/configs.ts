import type {
  DeepPartial,
  CandlestickSeriesPartialOptions,
  HistogramSeriesPartialOptions,
  PriceScaleOptions,
} from "lightweight-charts";
import type { MovingAverageHookOptions } from "@/types/chart.type";

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

export const MA20_OPTIONS: MovingAverageHookOptions = {
  length: 20,
  color: "#2962FF",
  lineWidth: 2,
};

export const MA60_OPTIONS: MovingAverageHookOptions = {
  length: 60,
  color: "#FF6D00",
  lineWidth: 2,
};

export const FETCHPAGE_THRESHOLD = 20;