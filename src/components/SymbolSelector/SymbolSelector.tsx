import { useState, useRef, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { SelectorProps } from "@/types/selector.type";
import { useSymbolsQuery } from "@/queries/useSymbolsQuery";
import { useVirtualizer } from "@tanstack/react-virtual";

function ListLoader() {
  return (
    <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
      Loading...
    </div>
  );
}

export function SymbolSelector({ value, onChange }: SelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const { data: allSymbols, isLoading, isError } = useSymbolsQuery();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setIsContentLoaded(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsContentLoaded(false);
    }
  }, [open]);

  const filteredSymbols = useMemo(() => {
    if (!isContentLoaded || !allSymbols) return [];
    if (!searchQuery) return allSymbols;
    return allSymbols.filter((symbol) =>
      symbol.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allSymbols, searchQuery, isContentLoaded]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredSymbols.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  const handleSelect = (symbolValue: string) => {
    onChange(symbolValue.toUpperCase());
    requestAnimationFrame(() => {
      setOpen(false);
    });
  };

  if (isLoading) return <Button variant="outline" disabled className="w-[200px] justify-between">Loading symbols...</Button>;
  if (isError) return <Button variant="outline" disabled className="w-[200px] justify-between text-red-600">Failed to load</Button>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between shadow-md">
          {value ? allSymbols?.find((s) => s.value === value)?.label : "Select ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search symbol..." value={searchQuery} onValueChange={setSearchQuery} />
          <div ref={parentRef} className="max-h-[200px] overflow-y-auto text-sm">
            {!isContentLoaded ? (
              <ListLoader />
            ) : filteredSymbols.length > 0 ? (
              <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: "100%", position: "relative" }}>
                {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                  const symbol = filteredSymbols[virtualItem.index];
                  return (
                    <div
                      key={virtualItem.key}
                      data-index={virtualItem.index}
                      ref={rowVirtualizer.measureElement}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                        display: "flex",
                        alignItems: "center",
                        padding: "0 0.5rem",
                      }}
                      className="cursor-pointer hover-bg-accent"
                      onClick={() => handleSelect(symbol.value)}
                    >
                      <span>{symbol.label}</span>
                      <Check className={cn("ml-auto h-4 w-4", value === symbol.value ? "opacity-100" : "opacity-0")} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <CommandEmpty>No symbol found.</CommandEmpty>
            )}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}