import { navbar } from "vuepress-theme-hope";

//https://icon-sets.iconify.design/
export const zhNavbar = navbar([
  {
    text: "财富自由",
    // icon: "pen-to-square",
    icon: "mdi:attach-money",
    link: "/category/%E7%90%86%E8%B4%A2/"
  },
  {
    text: "读书笔记",
    icon: "book",
    link: "/category/reading/",
  },
  {
    text: "老马随笔",
    icon: "mdi:calendar-today",
    link: "/category/lmxxf/",
  },
  {
    text: "商业思考",
    icon: "mdi:google-my-business",
    link: "/category/business/",
  },
  {
    text: "媒体运营",
    icon: "mdi:multimedia",
    link: "/category/fans/",
  },
  {
    text: "全部文章",
    icon: "pen-to-square",
    link: "/posts/",
  },
]);
