import { CrosshairMode } from "lightweight-charts";
import { Chart, CandlestickSeries, HistogramSeries, PriceScale } from "lightweight-charts-react-wrapper";
import { useCandlesQuery, useVolumesQuery } from "@/queries/useKlineQuery";
import type { GetKlinesParams } from "@/types/kline.type";

interface KlineChartProps {
  params: GetKlinesParams;
}

export default function KlineChart({ params }: KlineChartProps) {
  const { data: candlestickData, isLoading: isCandlesLoading, isError: isCandlesError } = useCandlesQuery(params);
  const { data: volumeData, isLoading: isVolumesLoading, isError: isVolumesError } = useVolumesQuery(params);

  if (isCandlesLoading || isVolumesLoading) {
    return (
      <div style={{ ...options.layout, width: options.width, height: options.height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Loading Chart...
      </div>
    );
  }

  if (isCandlesError || isVolumesError) {
    return (
      <div style={{ ...options.layout, width: options.width, height: options.height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
        Error: Could not load chart data.
      </div>
    );
  }
  
  if (!candlestickData || !volumeData) {
    return <div>No data available</div>;
  }

  return (
    <Chart {...options}>
      <CandlestickSeries
        reactive={true}
        data={candlestickData}
        upColor="rgba(0, 150, 136, 1)"  
        downColor="rgba(255, 82, 82, 1)"
        borderDownColor="rgba(255, 82, 82, 1)"
        borderUpColor="rgba(0, 150, 136, 1)"
        wickDownColor="rgba(255, 82, 82, 1)"
        wickUpColor="rgba(0, 150, 136, 1)"
      />
      <HistogramSeries
        data={volumeData}
        priceScaleId="volume-scale"
        priceFormat={{ type: "volume" }}
      />
      <PriceScale id="volume-scale" scaleMargins={{ top: 0.8, bottom: 0 }} />
    </Chart>
  );
}

const options = {
  width: 900,
  height: 600,
  layout: {
    backgroundColor: "#1e1e1e",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.2)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.2)",
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
};