import { cn } from "@/lib/utils";

export const combobox =
  "w-[200px] flex items-center dark:hover:border-yellow-300 justify-between hover:border hover:border-yellow-600 hover:dark:border-yellow-300 transition-all duration-200";

export const errorCombobox = "w-[200px] text-red-600";

export const selectedSymbolContainer = "flex items-center";

export const chevronIcon = "ml-2 h-4 w-4 shrink-0 opacity-50";

export const popoverContent = "w-[200px] p-0";

export const virtualList = "max-h-[200px] overflow-y-auto text-sm";

export const virtualItem =
  "flex items-center p-2 rounded-sm cursor-pointer hover:bg-accent";

export const logoIcon = "w-5 h-5 mr-2 rounded-full";

export const logoIconInList = "w-5 h-5 mr-3 rounded-full";

export function getCheckIconStyles(
  selectedValue: string,
  itemValue: string
): string {
  return cn(
    "h-4 w-4 ml-1",
    selectedValue === itemValue ? "opacity-100" : "opacity-0"
  );
}
