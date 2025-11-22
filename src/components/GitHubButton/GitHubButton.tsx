import { Github } from 'lucide-react';
import { Button } from '../ui/button';

const GitHubButton = () => {
  const getToGitHub = () => {
    window.open("https://github.com/junhocode/AssetFrame", "_blank");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={getToGitHub}
      className="
        hover:!bg-transparent 
        transition-colors duration-200 ease-in-out
         hover:text-yellow-200"
    >
      <Github/>
    </Button>
  )
}

export default GitHubButton;