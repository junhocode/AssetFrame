import { INTERVALS } from "@/constants/whiteList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { SelectorProps } from "@/types/selector.type";
import * as S from "./IntervalSelector.styles";

export const IntervalSelector = ({ value, onChange }: SelectorProps) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v)}
      className={S.toggleGroup}
    >
      {INTERVALS.map((interval) => (
        <ToggleGroupItem
          key={interval}
          value={interval}
          aria-label={`Select ${interval}`}
          className={S.toggleGroupItems}
        >
          {interval}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};