import { useEffect } from 'react';
import { useAtom } from 'jotai/react'
import { darkModeAtom } from '@/atoms/themeAtom'
import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '../ui/button';
import * as S from "./ThemeSwitcher.styles"

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useAtom(darkModeAtom)

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }
  },[isDark])

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