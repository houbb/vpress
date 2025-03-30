import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      "tomato",
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
