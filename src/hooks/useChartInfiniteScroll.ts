import { useRef, useEffect, useCallback } from "react";
import { FETCHPAGE_THRESHOLD } from "@/constants/configs";
import type { LogicalRange, Time } from "lightweight-charts";
import type { InfiniteScrollParams } from "@/types/chart.type";

const useChartInfiniteScroll = ({
  chartRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollParams) => {
  const visibleRangeRef = useRef<{ from: Time; to: Time } | null>(null);
  const latestPropsRef = useRef({ fetchNextPage, hasNextPage, isFetchingNextPage });

  useEffect(() => {
    latestPropsRef.current = { fetchNextPage, hasNextPage, isFetchingNextPage };
  });

  const handleVisibleLogicalRangeChange = useCallback(
    (logicalRange: LogicalRange | null) => {
      if (!logicalRange || !chartRef.current) return;

      const isNearLeftEdge = logicalRange.from < FETCHPAGE_THRESHOLD;

      if (isNearLeftEdge && hasNextPage && !isFetchingNextPage) {
        visibleRangeRef.current = chartRef.current
          .timeScale()
          .getVisibleRange();
        fetchNextPage();
      }
    },
    [chartRef, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return { handleVisibleLogicalRangeChange, visibleRangeRef };
};

export default useChartInfiniteScroll;