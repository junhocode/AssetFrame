import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import * as S from "./Layout.styles";

export const Layout = () => {
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