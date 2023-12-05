import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as e}from"./app-23d1540c.js";const i={},t=e(`<h2 id="修改前端代码" tabindex="-1"><a class="header-anchor" href="#修改前端代码" aria-hidden="true">#</a> 修改前端代码</h2><h3 id="ruoyi-ui-vue-config-js" tabindex="-1"><a class="header-anchor" href="#ruoyi-ui-vue-config-js" aria-hidden="true">#</a> ruoyi-ui/vue.config.js</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token comment">// 二级目录名称admin</span>
<span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">&#39;/admin/&#39;</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ruoyi-ui-src-router-index-js" tabindex="-1"><a class="header-anchor" href="#ruoyi-ui-src-router-index-js" aria-hidden="true">#</a> ruoyi-ui/src/router/index.js</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;history&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 去掉url中的#</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">&#39;/admin/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 二级目录路径</span>
  <span class="token function-variable function">scrollBehavior</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">y</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">routes</span><span class="token operator">:</span> constantRoutes
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置" aria-hidden="true">#</a> Nginx配置</h2><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>location ^~ /admin/ {
        alias   /wwwroot/demofe/dist/; # 静态文件目录，改成自己的
        index  index.html index.htm;
        try_files $uri $uri/ /index.html =404;
        autoindex  off;
    }

location /prod-api/ {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:8080/;
    proxy_connect_timeout 120;
    <span class="token title important"><span class="token punctuation">#</span> 没有接收数据关闭    等候后端服务器响应时间 这个可以响应的时间</span>
    proxy_read_timeout 120;  # 秒
    <span class="token title important"><span class="token punctuation">#</span> 没有发送数据关闭    后端服务器数据回传时间</span>
    proxy_send_timeout  120;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),r=[t];function o(p,l){return s(),a("div",null,r)}const u=n(i,[["render",o],["__file","ruoyi-nginx.html.vue"]]);export{u as default};
