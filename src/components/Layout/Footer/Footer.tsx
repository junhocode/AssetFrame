import * as S from "./Footer.styles"

const Footer = () => {
    return (
      <div className={S.footer}>
        <div className={S.text}>Copyright © 2025 Developed by JunhoCode, Powered by</div>
        <img src="/Binance-Logo.png" alt="Binance" 
        className="h-4 object-contain mb-0.5 ml-1"/>
      </div>
    );
  };
  
  export default Footer;