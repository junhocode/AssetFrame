import { useState } from 'react';
import KlineChart from './components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import type { GetKlinesParams } from '@/types/kline.type';

export default function App() {
  const [chartParams, setChartParams] = useState<GetKlinesParams>({
    symbol: 'BTCUSDT',
    interval: '1m',
    limit: 100,
  });

  useRealtimeChartData(chartParams);

  return (
    <div className="App">
        <KlineChart params={chartParams} />
    </div>
  );
}