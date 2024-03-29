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
      text: "MySQL",
      icon: "book",
      prefix: "mysql/",
      children: "structure",
    },
    {
      text: "Redis",
      icon: "book",
      prefix: "redis/",
      children: "structure",
    },
    {
      text: "前端",
      icon: "book",
      prefix: "fe/",
      children: "structure",
    },
    {
      text: "运维",
      icon: "book",
      prefix: "yunwei/",
      children: "structure",
    },
  ],
});
