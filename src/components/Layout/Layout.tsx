import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import Footer from "./Footer/Footer";

export const Layout = () => {
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