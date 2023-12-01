import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "Golang",
        prefix: "/golang",
        link: "/golang/",
        icon: "book"
    },
    {
        text: "PHP",
        prefix: "/php",
        link: "/php/",
        icon: "book"
    },
    {
        text: "MySQL",
        prefix: "/mysql",
        link: "/mysql/",
        icon: "book"
    },
    {
        text: "Redis",
        prefix: "/redis",
        link: "/redis/",
        icon: "book"
    },
    {
        text: "前端",
        prefix: "/fe",
        link: "/fe/",
        icon: "book"
    },
    {
        text: "运维",
        prefix: "/yunwei",
        link: "/yunwei/",
        icon: "book"
    },
    {
      text: "面试总结",
      icon: "book",
      link: "/tag/面试/",
    },
  // {
  //   text: "指南",
  //   icon: "lightbulb",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
