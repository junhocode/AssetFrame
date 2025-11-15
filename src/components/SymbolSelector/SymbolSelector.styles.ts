import { cn } from "@/lib/utils"

export const combobox = "w-[200px] justify-between"

export const errorCombobox = "w-[200px] justify-between text-red-600"

export const chevronIcon = "opacity-50"

export const popoverContent = "w-[200px] p-0"

export const virtualList = "max-h-[200px] overflow-y-auto text-sm"

export const virtualItem = "flex items-center p-2 rounded-sm cursor-pointer hover:bg-accent"

export function getCheckIconStyles(selectedValue: string, itemValue: string): string {
  return cn(
    "ml-auto h-4 w-4",
    selectedValue === itemValue ? "opacity-100" : "opacity-0"
  );
}