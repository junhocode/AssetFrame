import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

import type { SelectorProps } from "@/types/selector.type";

export function TimeScaleSelector({ value, onChange }: SelectorProps) {
  const intervals = ['1s', '1m', '15m', '1h', '4h', '1d', '1w', '1M'];

  const handleValueChange = (newValue: string) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={handleValueChange}
      className="tounded-full"
    >
      {intervals.map((interval) => (
        <ToggleGroupItem
          key={interval}
          value={interval}
          aria-label={`Select ${interval}`}
        >
          {interval}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}