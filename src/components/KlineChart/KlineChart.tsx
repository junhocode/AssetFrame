import { Chart, CandlestickSeries, HistogramSeries, PriceScale } from "lightweight-charts-react-wrapper";
import { useCandlesQuery, useVolumesQuery } from "@/queries/useKlineQuery";
import type { GetKlinesParams } from "@/types/kline.type";
import * as S from "./KlineChart.styles"

interface KlineChartProps {
  params: GetKlinesParams;
}

export default function KlineChart({ params }: KlineChartProps) {
  const { data: candlestickData, isLoading: isCandlesLoading, isError: isCandlesError } = useCandlesQuery(params);
  const { data: volumeData, isLoading: isVolumesLoading, isError: isVolumesError } = useVolumesQuery(params);

  if (isCandlesLoading || isVolumesLoading) {
    return (
      <div className={S.statusContainer}>
        Loading Chart...
      </div>
    );
  }

  if (isCandlesError || isVolumesError) {
    return (
      <div className={S.errorContainer}>
        Error: Could not load chart data.
      </div>
    );
  }
  
  if (!candlestickData || !volumeData) {
    return <div className={S.statusContainer}>
            No data available
           </div>
  }

  return (
    <Chart
    {...S.chartOptions}>
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