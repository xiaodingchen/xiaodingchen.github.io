import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Golang",
      icon: "book",
      prefix: "golang/",
      children: "structure",
    },
    {
      text: "PHP",
      icon: "book",
      prefix: "php/",
      children: "structure",
    },
    {
      text: "技术杂谈",
      icon: "book",
      prefix: "mark/",
      children: "structure",
    },
  ],
});
