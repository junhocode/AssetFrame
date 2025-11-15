import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { VirtualList } from "@/components/VirtualList/VirtualList";
import { Button } from "@/components/ui/button";
import { useSymbols } from "@/hooks/useSymbols";
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { SelectorProps } from "@/types/selector.type";
import * as S from "./SymbolSelector.styles"

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

  const { allSymbols, filteredSymbols, isLoading, isError } = useSymbols(searchQuery);

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

  const handleSelect = (symbolValue: string) => {
    onChange(symbolValue.toUpperCase());
    requestAnimationFrame(() => {
      setOpen(false);
    });
  };

  if (isLoading)
    return (
      <Button variant="outline" disabled className={S.combobox}>
        Loading symbols...
      </Button>
    );

  if (isError)
    return (
      <Button
        variant="outline"
        disabled
        className={S.errorCombobox}
      >
        Failed to load
      </Button>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={S.combobox}
        >
          {value
            ? allSymbols?.find((s) => s.value === value)?.label
            : "Select ..."}
          <ChevronsUpDown className={S.chevronIcon}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={S.popoverContent}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search symbol..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <div className={S.virtualList}>
            {!isContentLoaded ? (
              <ListLoader />
            ) : filteredSymbols.length > 0 ? (
              <VirtualList
                items={filteredSymbols}
                estimateSize={32}
                renderItem={(symbol) => (
                  <div 
                  className={S.virtualItem}
                  onClick={() => handleSelect(symbol.value)}>
                    <span>{symbol.label}</span>
                    <Check
                      className={S.getCheckIconStyles(value, symbol.value)}
                    />
                  </div>
                )}
              />
            ) : (
              <CommandEmpty>No symbol found.</CommandEmpty>
            )}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
