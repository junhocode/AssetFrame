import { useTickers } from "./useTickers";

export const useSearchTicker = (searchQuery: string) => {
  const { allTickers = [], isLoading, isError } = useTickers();

  const query = searchQuery.trim().toLowerCase();
  
  const filteredTickers = query 
    ? allTickers.filter((t) =>
        t.name.toLowerCase().includes(query) ||
        t.symbol.toLowerCase().includes(query)
      )
    : allTickers;

  return { filteredTickers, isLoading, isError };
};