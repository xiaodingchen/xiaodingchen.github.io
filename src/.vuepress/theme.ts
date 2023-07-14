import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://www.ixlymsy.top",

  author: {
    name: "码说256",
    url: "https://www.ixlymsy.top",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.png",

  repoDisplay: false,

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "备案号：皖ICP备2023001912号",
  copyright: "Copyright © 2023-present 码说256",

  displayFooter: true,

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  editLink: false,
  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },
  blog: {
    description: "码说256，一个程序员的成长记录",
  },
  plugins: {
    sitemap:{
      extraUrls: ['/category/', '/tag/'],
    },
    blog: {
      excerptLength: 0,
    },
    autoCatalog:{
      exclude: ['/demo/', '/guide/', '/slides/', '/images/', '/images']
    },
    // You should generate and use your own comment service
    comment: {
      comment: false,
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
