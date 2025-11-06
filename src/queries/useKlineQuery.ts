import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getKlines } from '@/apis/klines.api';
import { parseRestKlineToCandle } from '@/components/utils/klineParser';
import type { GetKlinesParams } from '@/types/kline.type';

export const useCandlesQuery = (params: GetKlinesParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.candles.list(params),

    queryFn: async () => {
      const rawData = await getKlines(params);
      const parsedData = rawData.map(parseRestKlineToCandle);
      return parsedData;
    },
    
    enabled: !!params.symbol,
  });
};

