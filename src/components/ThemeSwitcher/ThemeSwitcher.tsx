import { useEffect } from 'react';
import { useAtom } from 'jotai/react'
import { darkModeAtom } from '@/atoms/themeAtom'
import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '../ui/button';

const ThemeSwitcher = () => {
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
      className="
        hover:!bg-transparent 
        transition duration-200 ease-in-out
        hover:text-yellow-200"
    >
      {isDark
        ? <SunMedium className="w-5 h-5" />
        : <MoonStar className="w-5 h-5" />
      }
    </Button>
  )
}

export default ThemeSwitcher