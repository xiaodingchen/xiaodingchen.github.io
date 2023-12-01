import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,a as e}from"./app-f916d83f.js";const l={},o=e(`<h2 id="查询docker容器日志" tabindex="-1"><a class="header-anchor" href="#查询docker容器日志" aria-hidden="true">#</a> 查询docker容器日志</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;======== docker containers logs file size ========&quot;</span>
 
<span class="token assign-left variable">logs</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">find</span> /var/lib/docker/containers/ <span class="token parameter variable">-name</span> *-json.log<span class="token variable">)</span></span>
 
<span class="token keyword">for</span> <span class="token for-or-select variable">log</span> <span class="token keyword">in</span> <span class="token variable">$logs</span>
	  <span class="token keyword">do</span>
		<span class="token function">ls</span> <span class="token parameter variable">-lh</span> <span class="token variable">$log</span>
<span class="token keyword">done</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="清除docker容器日志" tabindex="-1"><a class="header-anchor" href="#清除docker容器日志" aria-hidden="true">#</a> 清除docker容器日志</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;======== start clean docker containers logs ========&quot;</span>
<span class="token assign-left variable">logs</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">find</span> /var/lib/docker/containers/ <span class="token parameter variable">-name</span> *-json.log<span class="token variable">)</span></span>
<span class="token keyword">for</span> <span class="token for-or-select variable">log</span> <span class="token keyword">in</span> <span class="token variable">$logs</span>
	<span class="token keyword">do</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;clean logs : <span class="token variable">$log</span>&quot;</span>
      <span class="token function">cat</span> /dev/null <span class="token operator">&gt;</span> <span class="token variable">$log</span>
<span class="token keyword">done</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;======== end clean docker containers logs ========&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),i=[o];function c(r,t){return a(),n("div",null,i)}const v=s(l,[["render",c],["__file","docker-log-clean.html.vue"]]);export{v as default};
