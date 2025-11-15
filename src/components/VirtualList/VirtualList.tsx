import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import * as S from "./VirtualList.styles"

interface VirtualListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  estimateSize: number;
  containerClassName?: string;
}

export function VirtualList<T>({ items, renderItem, estimateSize, containerClassName }: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className={containerClassName}>
      <div
        className={S.virtualListContainerStyles}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              className={S.virtualListItemStyles}
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}