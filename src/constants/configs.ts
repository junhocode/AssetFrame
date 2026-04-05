import type { DeepPartial, HistogramSeriesPartialOptions, PriceScaleOptions } from "lightweight-charts";
import type { ChartTooltipProps } from "@/types/chart.type";

export const VOLUME_PRICE_SCALE_ID = "volume-scale";

export const VOLUME_SERIES_OPTIONS: HistogramSeriesPartialOptions = {
  priceFormat: { type: "volume" },
  priceScaleId: VOLUME_PRICE_SCALE_ID,
};

export const VOLUME_SCALE_OPTIONS: DeepPartial<PriceScaleOptions> = {
  scaleMargins: { top: 0.8, bottom: 0 },
};

export const VOLUME_COLORS = {
  UP: "rgba(0, 150, 136, 0.8)",
  DOWN: "rgba(255, 82, 82, 0.8)",
};

export const FETCHPAGE_THRESHOLD = 20;

export const INITIAL_TOOLTIP_STATE: ChartTooltipProps = {
  top: 0,
  left: 0,
  visible: false,
};