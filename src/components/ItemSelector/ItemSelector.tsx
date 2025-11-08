import { NativeSelect, NativeSelectOption } from "../ui/native-select";

interface ItemSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ItemSelector({ value, onChange }: ItemSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <NativeSelect value={value} onChange={handleChange}>
      <NativeSelectOption value="BTCUSDT">Bitcoin</NativeSelectOption>
      <NativeSelectOption value="ETHUSDT">Ethereum</NativeSelectOption>
    </NativeSelect>
  );
}
