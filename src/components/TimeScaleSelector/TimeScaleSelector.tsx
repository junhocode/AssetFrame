import { intervals } from "@/constants/configs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { SelectorProps } from "@/types/selector.type";

export default function TimeScaleSelector({ value, onChange }: SelectorProps) {

  const handleValueChange = (newValue: string) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <div className="bg-white rounded-md">
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={handleValueChange}
      className="px-2 gap-2"
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
    </div>
  );
}