import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-3791dda3.js";const e={},p=t(`<h1 id="实现阻塞读且并发安全的map" tabindex="-1"><a class="header-anchor" href="#实现阻塞读且并发安全的map" aria-hidden="true">#</a> 实现阻塞读且并发安全的map</h1><p>GO里面MAP如何实现key不存在 get操作等待 直到key存在或者超时，保证并发安全，且需要实现以下接口：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> sp <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Out</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token comment">//存入key /val，如果该key读取的goroutine挂起，则唤醒。此方法不会阻塞，时刻都可以立即执行并返回</span>
    <span class="token function">Rd</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>  <span class="token comment">//读取一个key，如果key不存在阻塞，等待key存在或者超时</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>看到阻塞协程第一个想到的就是<code>channel</code>，题目中要求并发安全，那么必须用锁，还要实现多个<code>goroutine</code>读的时候如果值不存在则阻塞，直到写入值，那么每个键值需要有一个阻塞<code>goroutine</code> 的 <code>channel</code>。</p><p><a href="../src/q010.go">实现如下：</a></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Map <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	c   <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>entry
	rmx <span class="token operator">*</span>sync<span class="token punctuation">.</span>RWMutex
<span class="token punctuation">}</span>
<span class="token keyword">type</span> entry <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ch      <span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	value   <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	isExist <span class="token builtin">bool</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Map<span class="token punctuation">)</span> <span class="token function">Out</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span>rmx<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span>rmx<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	item<span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">.</span>c<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		m<span class="token punctuation">.</span>c<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>entry<span class="token punctuation">{</span>
			value<span class="token punctuation">:</span> val<span class="token punctuation">,</span>
			isExist<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	item<span class="token punctuation">.</span>value <span class="token operator">=</span> val
	<span class="token keyword">if</span> <span class="token operator">!</span>item<span class="token punctuation">.</span>isExist <span class="token punctuation">{</span>
		<span class="token keyword">if</span> item<span class="token punctuation">.</span>ch <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">close</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>ch<span class="token punctuation">)</span>
			item<span class="token punctuation">.</span>ch <span class="token operator">=</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","q010.html.vue"]]);export{r as default};
