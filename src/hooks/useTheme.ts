import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";

export const useTheme = () => {
  const isDark = useAtomValue(themeAtom);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
};