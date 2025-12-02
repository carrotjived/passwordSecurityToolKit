import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        checker: resolve(__dirname, "src/checker/index.html"),
        generate: resolve(__dirname, "src/generate/index.html"),
      },
    },
  },
});
