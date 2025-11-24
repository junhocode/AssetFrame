import { useEffect } from "react";
import { useAtomValue } from "jotai/react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import Footer from "./Footer/Footer";
import { darkModeAtom } from "@/atoms/themeAtom";
import * as S from "./Layout.styles";

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
    <div className={S.layoutContainer}>
      <Header />
      <main className={S.mainContent}>
        <Main />
      </main>
      <Footer />
    </div>
  );
};