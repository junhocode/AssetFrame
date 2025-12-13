import { useState, useEffect, type RefObject } from "react";

export const useFitRows = (
  ref: RefObject<HTMLElement | null> | RefObject<any>, 
  rowHeight: number
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateCount = () => {
      if (ref.current) {
        const height = ref.current.clientHeight;
        setCount(Math.floor(height / rowHeight));
      }
    };

    updateCount();

    const observer = new ResizeObserver(updateCount);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, rowHeight]);

  return count;
};