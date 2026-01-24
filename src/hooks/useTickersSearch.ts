import { useMemo } from "react";
import { useTickers } from "./useTickers";

export const useTickerSearch = (searchQuery: string) => {
  const { allTickers, isLoading, isError } = useTickers();

  const filteredTickers = useMemo(() => {
    if (!searchQuery) return allTickers;
    
    const query = searchQuery.toLowerCase();
    return allTickers.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.symbol.toLowerCase().includes(query)
    );
  }, [allTickers, searchQuery]);

  return { filteredTickers, isLoading, isError };
};