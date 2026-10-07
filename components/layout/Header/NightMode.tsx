import { Moon, Sun } from "lucide-react";
import { Button } from "../../ui/button";
import { useTheme } from "next-themes";

const NightMode = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="ghost"
      className="grid size-6 place-items-center rounded-full transition-colors text-gray-500 hover:bg-[#ededeb] hover:text-[#111] hover:scale-105 dark:text-gray-300 dark:hover:bg-[#202020] dark:hover:text-[#f8f8f6]"
    >
      {resolvedTheme === "dark" ? (
        <Sun strokeWidth={2.25} />
      ) : (
        <Moon strokeWidth={2.25} />
      )}
    </Button>
  );
};

export default NightMode;
