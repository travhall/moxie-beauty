"use client";

import ThemeSwitch from "./theme-toggle";

/** Thin client island so the rest of Footer can be a server component. */
export default function FooterThemeIsland() {
  return <ThemeSwitch />;
}
