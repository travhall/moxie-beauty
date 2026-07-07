import { fileURLToPath } from "url";
import { includeIgnoreFile } from "@eslint/compat";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

const eslintConfig = [
  includeIgnoreFile(gitignorePath),
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
