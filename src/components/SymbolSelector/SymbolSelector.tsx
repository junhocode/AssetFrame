import { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { VirtualList } from "@/components/VirtualList/VirtualList";
import { PriceChangeBadge } from "../PriceChangeBadge/PriceChangeBadge";
import { Button } from "@/components/ui/button";
import { useSymbols } from "@/hooks/useSymbols";
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SelectorProps } from "@/types/selector.type";
import * as S from "./SymbolSelector.styles";

export const SymbolSelector = ({ value, onChange }: SelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { allSymbols, filteredSymbols, isLoading, isError } =
    useSymbols(searchQuery);

  const selectedSymbol = useMemo(() => {
    if (!value || !allSymbols) return null;
    return allSymbols.find((s) => s.symbol === value);
  }, [allSymbols, value]);

  const handleSelect = (symbolValue: string) => {
    onChange(symbolValue.toUpperCase());
    requestAnimationFrame(() => {
      setOpen(false);
    });
  };

  if (isLoading)
    return (
      <Button variant="outline" disabled className={S.combobox}>
        Loading Cryptos..
      </Button>
    );

  if (isError)
    return (
      <Button variant="outline" disabled className={S.errorCombobox}>
        Sorry, there has been an error.. Please refresh!
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
          <div className={S.selectedSymbolContainer}>
            {selectedSymbol ? (
              <>
                <img
                  src={selectedSymbol.logoUrl}
                  alt={selectedSymbol.name}
                  className={S.logoIcon}
                />
                <span className="pr-4">{selectedSymbol.name}</span>
                <PriceChangeBadge value={selectedSymbol.priceChangePercent ?? 0} />
              </>
            ) : (
              "Select crypto..."
            )}
          </div>
          <ChevronsUpDown className={S.chevronIcon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={S.popoverContent}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search crypto..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <div className={S.virtualList}>
            {filteredSymbols.length > 0 ? (
              <VirtualList
                items={filteredSymbols}
                estimateSize={32}
                renderItem={(symbol) => (
                  <div
                    className={S.virtualItem}
                    onClick={() => handleSelect(symbol.symbol)}
                  >
                    <img
                      src={symbol.logoUrl}
                      alt={symbol.name}
                      className={S.logoIconInList}
                    />
                    <span className="grow">{symbol.name}</span>
                    <PriceChangeBadge value={symbol.priceChangePercent ?? 0} />
                    <Check
                      className={S.getCheckIconStyles(value, symbol.symbol)}
                    />
                  </div>
                )}
              />
            ) : (
              <CommandEmpty>No crypto found.</CommandEmpty>
            )}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
