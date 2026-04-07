import { Layout } from "@/components/Layout/Layout";
import { useTheme } from "@/hooks/useTheme";

export const App = () => {
  useTheme();
  return <Layout />;
};