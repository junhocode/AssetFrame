import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { PriceBadge } from "@/components/PriceBadge/PriceBadge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTickerSearch } from "@/hooks/useTickerSearch";
import type { SelectorProps } from "@/types/selector.type";
import * as S from "./TickerSelector.styles";

export const TickerSelector = ({ value, onChange }: SelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { filteredTickers, isLoading, isError } = useTickerSearch(searchQuery);

  const selectedTicker = value 
    ? filteredTickers.find((t) => t.symbol === value) 
    : null;

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
            {selectedTicker ? (
              <>
                <img
                  src={selectedTicker.logoUrl}
                  alt={selectedTicker.name}
                  className={S.logoIcon}
                />
                <span className="pr-4">{selectedTicker.name}</span>
                <PriceBadge value={selectedTicker.priceChangePercent ?? 0} />
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
          <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            {filteredTickers.length > 0 ? (
              <CommandGroup>
                {filteredTickers.map((ticker) => (
                  <CommandItem
                    key={ticker.symbol}
                    value={ticker.symbol}
                    onSelect={() => handleSelect(ticker.symbol)}
                    className={S.virtualItem}
                  >
                    <img
                      src={ticker.logoUrl}
                      alt={ticker.name}
                      className={S.logoIconInList}
                    />
                    <span className="grow">{ticker.name}</span>
                    <PriceBadge value={ticker.priceChangePercent ?? 0} />
                    <Check
                      className={S.getCheckIconStyles(value, ticker.symbol)}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No ticker found.</CommandEmpty>
            )}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};