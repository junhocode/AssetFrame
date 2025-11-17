import { INTERVALS } from "@/constants/configs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { SelectorProps } from "@/types/selector.type";
import * as S from "./TimeScaleSelector.styles";

export const TimeScaleSelector = ({ value, onChange }: SelectorProps) => {
  const handleValueChange = (newValue: string) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={handleValueChange}
        className={S.toggleGroup}
      >
        {INTERVALS.map((interval) => (
          <ToggleGroupItem
            key={interval}
            value={interval}
            aria-label={`Select ${interval}`}
          >
            {interval}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
