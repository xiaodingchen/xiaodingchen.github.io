import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "个人成长全记录-码说256",
  description: "码说256，一个程序员的成长记录，专注于PHP、Golang后端，Vue，小程序等前端开发，略懂MySQL、Redis等数据库",

  theme,

  plugins: [
    searchProPlugin({
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    })
  ]

  // Enable it with pwa
  // shouldPrefetch: false,
});
