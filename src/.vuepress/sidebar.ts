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
  ],
});
