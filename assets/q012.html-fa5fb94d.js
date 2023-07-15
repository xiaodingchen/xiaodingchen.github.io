import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-a3613753.js";const e={},p=t(`<h2 id="_1-写出以下逻辑-要求每秒钟调用一次proc并保证程序不退出" tabindex="-1"><a class="header-anchor" href="#_1-写出以下逻辑-要求每秒钟调用一次proc并保证程序不退出" aria-hidden="true">#</a> 1. 写出以下逻辑，要求每秒钟调用一次proc并保证程序不退出?</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1 在这里需要你写算法</span>
        <span class="token comment">// 2 要求每秒钟调用一次proc函数</span>
        <span class="token comment">// 3 要求程序不能退出</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">proc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;ok&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析</strong></p><p>题目主要考察了两个知识点：</p><ol><li>定时执行执行任务</li><li>捕获 panic 错误</li></ol><p>题目中要求每秒钟执行一次，首先想到的就是 <code>time.Ticker</code>对象，该函数可每秒钟往<code>chan</code>中放一个<code>Time</code>,正好符合我们的要求。</p><p>在 <code>golang</code> 中捕获 <code>panic</code> 一般会用到 <code>recover()</code> 函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 1 在这里需要你写算法</span>
		<span class="token comment">// 2 要求每秒钟调用一次proc函数</span>
		<span class="token comment">// 3 要求程序不能退出</span>

		t <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTicker</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>t<span class="token punctuation">.</span>C<span class="token punctuation">:</span>
				<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
						<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
							fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
					<span class="token function">proc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">select</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">proc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;ok&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","q012.html.vue"]]);export{k as default};
