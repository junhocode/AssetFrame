import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { PriceBadge } from "@/components/PriceBadge/PriceBadge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTickerSearch } from "@/hooks/useTickerSearch";
import type { DisplayTicker } from "@/types/ticker.type";
import type { SelectorProps } from "@/types/selector.type";
import * as S from "./TickerSelector.styles";

const TickerRow = ({ ticker }: { ticker: DisplayTicker }) => (
  <div className={S.tickerRow}>
    <img src={ticker.logoUrl} alt={ticker.name} className={S.logoIcon} />
    <span className={S.tickerName}>{ticker.name}</span>
    <PriceBadge value={ticker.priceChangePercent ?? 0} />
  </div>
);

export const TickerSelector = ({ value, onChange }: SelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { filteredTickers, isLoading, isError } = useTickerSearch(searchQuery);

  const selectedTicker = value
    ? filteredTickers?.find((t) => t.symbol === value)
    : null;

  const handleSelect = (symbolValue: string) => {
    onChange(symbolValue.toUpperCase());
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSearchQuery("");
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
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={S.combobox}
        >
          {selectedTicker ? (
            <TickerRow ticker={selectedTicker} />
          ) : (
            "Select crypto..."
          )}
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
          <div className={S.scrollArea}>
            {filteredTickers.length > 0 ? (
              <CommandGroup>
                {filteredTickers.map((ticker) => (
                  <CommandItem
                    key={ticker.symbol}
                    value={ticker.symbol}
                    onSelect={() => handleSelect(ticker.symbol)}
                  >
                    <TickerRow ticker={ticker} />
                    <Check className={S.checkIcon(value === ticker.symbol)} />
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