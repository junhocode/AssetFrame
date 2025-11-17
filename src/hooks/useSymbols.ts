import { useMemo } from "react";
import { useSymbolsQuery } from "@/queries/useSymbolsQuery";

export const useSymbols = (searchQuery: string) => {
  const { data: allSymbols, isLoading, isError } = useSymbolsQuery();

  const filteredSymbols = useMemo(() => {
    if (!allSymbols) return [];
    if (!searchQuery) return allSymbols;

    return allSymbols.filter((symbol) =>
      symbol.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allSymbols, searchQuery]);

  return { allSymbols, filteredSymbols, isLoading, isError };
};
