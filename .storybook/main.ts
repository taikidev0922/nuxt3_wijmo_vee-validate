import type { StorybookConfig } from "@storybook/vue3-vite";
import AutoImport from "unplugin-auto-import/vite";
import AutoImportComponents from "unplugin-vue-components/vite";
const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    if (config.plugins !== undefined) {
      config.plugins.push(
        AutoImport({ imports: ["vue"], dts: ".storybook/auto-imports.d.ts" })
      );
      config.plugins.push(
        AutoImportComponents({
          dirs: ["components"],
          directoryAsNamespace: false, // trueの場合ディレクトリ名もコンポーネント名に含む
          dts: ".storybook/components.d.ts",
        })
      );
    }
    return {
      ...config,
      define: {
        ...config.define,
        global: "window",
      },
    };
  },
};
export default config;
