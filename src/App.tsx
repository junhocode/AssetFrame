import { useState } from 'react';
import KlineChart from './components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import type { GetKlinesParams } from '@/types/kline.type';

export default function App() {
  const [chartParams, setChartParams] = useState<GetKlinesParams>({
    symbol: 'BTCUSDT',
    interval: '1m',
  });

  useRealtimeChartData(chartParams);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-500">
      <KlineChart params={chartParams} />
    </div>
  );
}