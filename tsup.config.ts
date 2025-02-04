import { defineConfig } from 'tsup';

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  clean: true,
  entry: ["src/main.ts"],
  format: ["cjs"],
  minify: !isDev,
  target: "node20",
  outDir: "dist",
  sourcemap: true,
});

