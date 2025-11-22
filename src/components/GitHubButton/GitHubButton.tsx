import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as S from "./GitHubButton.styles";

export const GitHubButton = () => {
  const getToGitHub = () => {
    window.open("https://github.com/junhocode/AssetFrame", "_blank");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={getToGitHub}
      className={S.gitHubButton}
    >
      <Github />
    </Button>
  );
};
