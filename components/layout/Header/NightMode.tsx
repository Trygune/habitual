"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const NightMode = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="grid size-10 place-items-center"
        aria-label="Toggle theme"
      >
        <Moon strokeWidth={2.25} />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="ghost"
      className="grid size-10 place-items-center text-gray-500 dark:text-gray-300"
      aria-label="Toggle theme"
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
