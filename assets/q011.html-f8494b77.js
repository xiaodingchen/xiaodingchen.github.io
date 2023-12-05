import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-23d1540c.js";const p={},o=t(`<h1 id="高并发下的锁与map的读写" tabindex="-1"><a class="header-anchor" href="#高并发下的锁与map的读写" aria-hidden="true">#</a> 高并发下的锁与map的读写</h1><p>场景：在一个高并发的web服务器中，要限制IP的频繁访问。现模拟100个IP同时并发访问服务器，每个IP要重复访问1000次。</p><p>每个IP三分钟之内只能访问一次。修改以下代码完成该过程，要求能成功输出 success:100</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
 
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
 
<span class="token keyword">type</span> Ban <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	visitIPs <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>time<span class="token punctuation">.</span>Time
<span class="token punctuation">}</span>
 
<span class="token keyword">func</span> <span class="token function">NewBan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Ban <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Ban<span class="token punctuation">{</span>visitIPs<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Ban<span class="token punctuation">)</span> <span class="token function">visit</span><span class="token punctuation">(</span>ip <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> o<span class="token punctuation">.</span>visitIPs<span class="token punctuation">[</span>ip<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	o<span class="token punctuation">.</span>visitIPs<span class="token punctuation">[</span>ip<span class="token punctuation">]</span> <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	success <span class="token operator">:=</span> <span class="token number">0</span>
	ban <span class="token operator">:=</span> <span class="token function">NewBan</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				ip <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.1.%d&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">)</span>
				<span class="token keyword">if</span> <span class="token operator">!</span>ban<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					success<span class="token operator">++</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
 
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;success:&quot;</span><span class="token punctuation">,</span> success<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析</strong></p><p>该问题主要考察了并发情况下map的读写问题，而给出的初始代码，又存在<code>for</code>循环中启动<code>goroutine</code>时变量使用问题以及<code>goroutine</code>执行滞后问题。</p><p>因此，首先要保证启动的<code>goroutine</code>得到的参数是正确的，然后保证<code>map</code>的并发读写，最后保证三分钟只能访问一次。</p><p>多CPU核心下修改<code>int</code>的值极端情况下会存在不同步情况，因此需要原子性的修改int值。</p><p>下面给出的实例代码，是启动了一个协程每分钟检查一下<code>map</code>中的过期<code>ip</code>，<code>for</code>启动协程时传参。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;context&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;sync/atomic&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Ban <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	visitIPs <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>time<span class="token punctuation">.</span>Time
	lock      sync<span class="token punctuation">.</span>Mutex
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewBan</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token operator">*</span>Ban <span class="token punctuation">{</span>
	o <span class="token operator">:=</span> <span class="token operator">&amp;</span>Ban<span class="token punctuation">{</span>visitIPs<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span><span class="token punctuation">}</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		timer <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">NewTimer</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Minute <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>timer<span class="token punctuation">.</span>C<span class="token punctuation">:</span>
				o<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> o<span class="token punctuation">.</span>visitIPs <span class="token punctuation">{</span>
					<span class="token keyword">if</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> time<span class="token punctuation">.</span>Minute<span class="token operator">*</span><span class="token number">1</span> <span class="token punctuation">{</span>
						<span class="token function">delete</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>visitIPs<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
				o<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				timer<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Minute <span class="token operator">*</span> <span class="token number">1</span><span class="token punctuation">)</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> o
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Ban<span class="token punctuation">)</span> <span class="token function">visit</span><span class="token punctuation">(</span>ip <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	o<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> o<span class="token punctuation">.</span>lock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> o<span class="token punctuation">.</span>visitIPs<span class="token punctuation">[</span>ip<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
	o<span class="token punctuation">.</span>visitIPs<span class="token punctuation">[</span>ip<span class="token punctuation">]</span> <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	success <span class="token operator">:=</span> <span class="token function">int64</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	ban <span class="token operator">:=</span> <span class="token function">NewBan</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

	wait <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>

	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>j <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">defer</span> wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				ip <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.1.%d&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">)</span>
				<span class="token keyword">if</span> <span class="token operator">!</span>ban<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span>ip<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					atomic<span class="token punctuation">.</span><span class="token function">AddInt64</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>success<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;success:&quot;</span><span class="token punctuation">,</span> success<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),e=[o];function c(i,u){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","q011.html.vue"]]);export{r as default};
