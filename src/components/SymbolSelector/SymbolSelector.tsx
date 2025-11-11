import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SelectorProps } from "@/types/selector.type";
import { useSymbolsQuery } from "@/queries/useSymbolsQuery";

const TOP_SYMBOLS_LIST = [
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "XRPUSDT",
  "BNBUSDT",
];

export function SymbolSelector({ value, onChange }: SelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allSymbols, isLoading, isError } = useSymbolsQuery();

  const topSymbols = useMemo(
    () => (allSymbols || []).filter((s) => TOP_SYMBOLS_LIST.includes(s.value)),
    [allSymbols]
  );

  const displaySymbols = searchQuery.length > 0 ? allSymbols || [] : topSymbols;

  if (isLoading) {
    return (
      <Button variant="outline" disabled className="w-[200px] justify-between">
        Loading symbols...
      </Button>
    );
  }
  if (isError) {
    return (
      <Button
        variant="outline"
        disabled
        className="w-[200px] justify-between text-red-600"
      >
        Failed to load
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? allSymbols?.find((symbol) => symbol.value === value)?.label
            : "Select ..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command onValueChange={setSearchQuery}>
          <CommandInput
            placeholder="Search symbol..."
            className="h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No symbol found.</CommandEmpty>
            <CommandGroup>
              {displaySymbols.map((symbol) => (
                <CommandItem
                  key={symbol.value}
                  value={symbol.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue.toUpperCase());
                    setOpen(false);
                  }}
                >
                  {symbol.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === symbol.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
