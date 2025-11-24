import { SystemStatus } from "@/components/SystemStatus/SystemStatus";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { GitHubButton } from "@/components/GitHubButton/GitHubButton";
import * as S from "./Header.styles";

export const Header = () => {
  return (
    <header className={S.header}>
      <div className={S.logoContainer}>
        "THE CHART"
        <span className={S.slogan}>
          Providing real-time market data of selected assets
        </span>
      </div>

      <div className={S.actionsContainer}>
        <SystemStatus />
        <div className={S.divider} />
        <GitHubButton />
        <ThemeSwitcher />
      </div>
    </header>
  );
};