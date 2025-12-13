import * as S from "./Footer.styles";

export const Footer = () => {
  return (
    <div className={S.footer}>
      <div className={S.text}>
        Copyright © 2025 Developed by JunhoCode, Powered by
      </div>
      <img src="/Binance-Logo.png" alt="Binance" className={S.image} />
    </div>
  );
};
