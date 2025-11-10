import { useRef, useCallback } from "react";
import { FETCHPAGE_THRESHOLD } from "@/constants/configs";
import type { LogicalRange } from "lightweight-charts";
import type { InfiniteScrollParams } from "@/types/chart.type";

const useChartInfiniteScroll = ({
  chartRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollParams) => {
  const visibleRangeRef = useRef<LogicalRange | null>(null);

  const handleVisibleLogicalRangeChange = useCallback(
    (logicalRange: LogicalRange | null) => {
      if (!logicalRange || !chartRef.current) return;

      const isNearLeftEdge = logicalRange.from < FETCHPAGE_THRESHOLD;

      if (isNearLeftEdge && hasNextPage && !isFetchingNextPage) {
        visibleRangeRef.current = chartRef.current
          .timeScale()
          .getVisibleLogicalRange();
        fetchNextPage();
      }
    },
    [chartRef, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return { handleVisibleLogicalRangeChange, visibleRangeRef };
};

export default useChartInfiniteScroll;