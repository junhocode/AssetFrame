import { useState } from "react";
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

const symbols = [
  {
    value: "BTCUSDT",
    label: "Bitcoin",
  },
  {
    value: "ETHUSDT",
    label: "Ethereum",
  },
  {
    value: "SOLUSDT",
    label: "Solana",
  },
  {
    value: "XRPUSDT",
    label: "Ripple",
  },
  {
    value: "BNBUSDT",
    label: "BNB",
  },
];

export function SymbolSelector({ value, onChange }: SelectorProps) {
  const [open, setOpen] = useState(false);

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
            ? symbols.find((symbol) => symbol.value === value)?.label
            : "Select ..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search symbol..." className="h-9" />
          <CommandList>
            <CommandEmpty>No symbol found.</CommandEmpty>
            <CommandGroup>
              {symbols.map((symbol) => (
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
