import { useEffect } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useAtom } from "jotai/react"
import { themeAtom } from "@/atoms/themeAtom";
import { Button } from "@/components/ui/button";
import * as S from "./ThemeToggle.styles"

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useAtom(themeAtom)

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDark])

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className={S.themeButton}
    >
      {isDark
        ? <SunMedium className={S.icon} />
        : <MoonStar className={S.icon} />
      }
    </Button>
  )
};