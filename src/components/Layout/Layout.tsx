import { useEffect } from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import Footer from "./Footer/Footer";
import { useAtomValue } from "jotai/react";
import { darkModeAtom } from "@/atoms/themeAtom";

export const Layout = () => {
  const isDark = useAtomValue(darkModeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex h-screen w-full flex-col bg-[#171717] text-white overflow-hidden font-sans">
      <Header />
      <main className="flex-1 flex min-h-0 w-full">
        <Main />
      </main>
      <Footer />
    </div>
  );
};