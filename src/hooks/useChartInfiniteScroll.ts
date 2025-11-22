import { useRef, useCallback } from "react";
import { FETCHPAGE_THRESHOLD } from "@/constants/configs";
import type { LogicalRange } from "lightweight-charts";
import type { InfiniteScrollParams } from "@/types/chart.type";

export const useChartInfiniteScroll = ({
  chartRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollParams) => {
  const visibleRangeRef = useRef<LogicalRange | null>(null);
  const scrollLockRef = useRef(false);

  const handleVisibleLogicalRangeChange = useCallback(
    (logicalRange: LogicalRange | null) => {
      if (scrollLockRef.current) return;
      if (!logicalRange || !chartRef.current) return;

      const isNearLeftEdge = logicalRange.from < FETCHPAGE_THRESHOLD;

      if (isNearLeftEdge && hasNextPage && !isFetchingNextPage) {
        scrollLockRef.current = true;
        visibleRangeRef.current = chartRef.current
          .timeScale()
          .getVisibleLogicalRange();
        fetchNextPage();
      }
    },
    [chartRef, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return { handleVisibleLogicalRangeChange, visibleRangeRef, scrollLockRef };
};
