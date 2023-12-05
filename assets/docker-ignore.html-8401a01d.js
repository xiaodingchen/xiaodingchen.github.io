import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as a,c as d,b as e,d as n,e as i,a as t}from"./app-23d1540c.js";const l={},s=t(`<h2 id="发现问题" tabindex="-1"><a class="header-anchor" href="#发现问题" aria-hidden="true">#</a> 发现问题</h2><p>在<code>docker build</code>时发现docker context 随着时间的增长，build越慢，context越大。<br> 这个时候就需要使用.dockerignore文件忽略非必要的上下文。<br> 比如： logs、upload等文件目录<br> .dockerignore 文件类似于.gitignore文件，格式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>logs/
upload/
*.jar
*.zip
bin/
*.log
cache/
runtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将这个文件放到docker项目根目录，用来排除不需要上传到 docker 服务端的文件或目录。</p><p>docker 在构建镜像时首先从构建上下文找有没有 .dockerignore 文件，如果有的话则在上传上下文到 docker 服务端时忽略掉 .dockerignore 里面的文件列表。</p>`,5),m={href:"https://www.cnblogs.com/panpanwelcome/p/12603658.html",target:"_blank",rel:"noopener noreferrer"};function p(u,v){const r=c("ExternalLinkIcon");return a(),d("div",null,[s,e("p",null,[n("可以参考这篇文章："),e("a",m,[n("https://www.cnblogs.com/panpanwelcome/p/12603658.html"),i(r)])])])}const g=o(l,[["render",p],["__file","docker-ignore.html.vue"]]);export{g as default};
