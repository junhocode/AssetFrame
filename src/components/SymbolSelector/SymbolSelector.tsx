import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { VirtualList } from "@/components/VirtualList/VirtualList";
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

  const handleSelect = (symbolValue: string) => {
    onChange(symbolValue.toUpperCase());
    requestAnimationFrame(() => {
      setOpen(false);
    });
  };

  if (isLoading)
    return (
      <Button variant="outline" disabled className={S.combobox}>
        종목을 불러오는 중..
      </Button>
    );

  if (isError)
    return (
      <Button variant="outline" disabled className={S.errorCombobox}>
        종목을 불러오는데 실패했습니다, 재시도 해주세요.
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
            : "종목 선택..."}
          <ChevronsUpDown className={S.chevronIcon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={S.popoverContent}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="종목 검색..."
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
                    onClick={() => handleSelect(symbol.value)}
                  >
                    <span>{symbol.label}</span>
                    <Check
                      className={S.getCheckIconStyles(value, symbol.value)}
                    />
                  </div>
                )}
              />
            ) : (
              <CommandEmpty>해당하는 종목이 없습니다.</CommandEmpty>
            )}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
