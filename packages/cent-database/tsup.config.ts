import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    schema: "src/schema/index.ts",
    repositories: "src/repositories/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
});
