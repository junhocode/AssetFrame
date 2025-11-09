import { useCallback } from "react";
import
import type { LogicalRange } from "lightweight-charts";

const useChartInfiniteScroll = () => {
  const handleVisibleLogicalRangeChange = useCallback(
    (logicalRange: LogicalRange | null) => {
      if (!logicalRange) return;

      const isNearLeftEdge = logicalRange.from < 20;

      if (isNearLeftEdge && hasNextPage && !isFetchingNextPage) {
        visibleRangeRef.current = chartRef.current
          .timeScale()
          .getVisibleRange();
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

return 
};

export default useChartInfiniteScroll;
