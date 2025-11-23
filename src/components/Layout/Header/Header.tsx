import { SystemStatus } from "@/components/SystemStatus/SystemStatus";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { GitHubButton } from "@/components/GitHubButton/GitHubButton";

export const Header = () => {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-800 bg-[#171717] px-4 z-50">
      
      <div className="flex items-center gap-2 font-bold text-lg text-white">
        "THE CHART" <span className="text-yellow-300 text-xs">Providing real-time market data of selected assets</span>
      </div>

      <div className="flex items-center gap-3">
        <SystemStatus />
        <div className="h-4 w-px bg-neutral-800" />
        <GitHubButton />
        <ThemeSwitcher />
      </div>

    </header>
  );
};