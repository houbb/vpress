import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/vpress/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "老马啸西风",
      description: "老马啸西风的技术博客",
    },
    // "/zh/": {
    //   lang: "zh-CN",
    //   title: "老马啸西风",
    //   description: "老马啸西风的技术博客",
    // },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
