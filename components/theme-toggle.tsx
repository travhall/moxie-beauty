"use client";

import { useTheme } from "@/providers/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-12 h-7" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative inline-flex w-12 h-7 items-center rounded-full transition duration-200 ease-in-out bg-(--button) text-(--button-foreground) hover:bg-(--button)/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)`}
      aria-label="Toggle theme"
      role="switch"
      aria-checked={theme === "dark"}
    >
      <span
        className={`
          relative inline-block h-5 w-5 transform rounded-full
          bg-(--background) shadow-lg ring-0 transition duration-200 ease-in-out
          ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
        `}
      >
        <Sun className="h-4 w-4 m-0.5 text-(--accent) dark:hidden" />
        <Moon className="h-4 w-4 m-0.5 text-(--accent) hidden dark:block" />
      </span>
    </button>
  );
}
