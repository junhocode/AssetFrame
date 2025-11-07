import KlineChart from './components/KlineChart/KlineChart';
import { useRealtimeChartData } from '@/hooks/useRealtimeChartData';
import { ItemSelector } from './components/ItemSelector/ItemSelector';

export default function App() {
  const chartParams = {
    symbol: 'BTCUSDT',
    interval: '1m',
    limit: 200
  };

  useRealtimeChartData(chartParams);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-500">
      <div className="flex flex-col items-start gap-4">
        <ItemSelector />
        <KlineChart params={chartParams} />
      </div>
    </div>
  );
}