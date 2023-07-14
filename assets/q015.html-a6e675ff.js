import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as e,c,b as n,d as s,e as o,a as i}from"./app-3791dda3.js";const l={},u=n("h1",{id:"golang-并发题目测试",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#golang-并发题目测试","aria-hidden":"true"},"#"),s(" golang 并发题目测试")],-1),d={href:"https://colobu.com/2019/04/28/go-concurrency-quizzes/",target:"_blank",rel:"noopener noreferrer"},k=i(`<h3 id="_1-mutex" tabindex="-1"><a class="header-anchor" href="#_1-mutex" aria-hidden="true">#</a> 1 Mutex</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>Mutex
<span class="token keyword">var</span> chain <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	chain <span class="token operator">=</span> <span class="token string">&quot;main&quot;</span>
	<span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>chain<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	chain <span class="token operator">=</span> chain <span class="token operator">+</span> <span class="token string">&quot; --&gt; A&quot;</span>
	<span class="token function">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	chain <span class="token operator">=</span> chain <span class="token operator">+</span> <span class="token string">&quot; --&gt; B&quot;</span>
	<span class="token function">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	chain <span class="token operator">=</span> chain <span class="token operator">+</span> <span class="token string">&quot; --&gt; C&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 输出 main --&gt; A --&gt; B --&gt; C</li><li>C: 输出 main</li><li>D: panic</li></ul><h3 id="_2-rwmutex" tabindex="-1"><a class="header-anchor" href="#_2-rwmutex" aria-hidden="true">#</a> 2 RWMutex</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">var</span> mu sync<span class="token punctuation">.</span>RWMutex
<span class="token keyword">var</span> count <span class="token builtin">int</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	count<span class="token operator">++</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mu<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token function">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">C</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	mu<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> mu<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 输出 1</li><li>C: 程序hang住</li><li>D: panic</li></ul><h3 id="_3-waitgroup" tabindex="-1"><a class="header-anchor" href="#_3-waitgroup" aria-hidden="true">#</a> 3 Waitgroup</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 无输出，正常退出</li><li>C: 程序hang住</li><li>D: panic</li></ul><h3 id="_4-双检查实现单例" tabindex="-1"><a class="header-anchor" href="#_4-双检查实现单例" aria-hidden="true">#</a> 4 双检查实现单例</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> doublecheck
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">type</span> Once <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	m    sync<span class="token punctuation">.</span>Mutex
	done <span class="token builtin">uint32</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>Once<span class="token punctuation">)</span> <span class="token function">Do</span><span class="token punctuation">(</span>f <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> o<span class="token punctuation">.</span>done <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	o<span class="token punctuation">.</span>m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> o<span class="token punctuation">.</span>m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> o<span class="token punctuation">.</span>done <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		o<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token number">1</span>
		<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 可以编译，正确实现了单例</li><li>C: 可以编译，有并发问题，f函数可能会被执行多次</li><li>D: 可以编译，但是程序运行会panic</li></ul><h3 id="_5-mutex" tabindex="-1"><a class="header-anchor" href="#_5-mutex" aria-hidden="true">#</a> 5 Mutex</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">type</span> MyMutex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	count <span class="token builtin">int</span>
	sync<span class="token punctuation">.</span>Mutex
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> mu MyMutex
	mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> mu2 <span class="token operator">=</span> mu
	mu<span class="token punctuation">.</span>count<span class="token operator">++</span>
	mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	mu2<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	mu2<span class="token punctuation">.</span>count<span class="token operator">++</span>
	mu2<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>mu<span class="token punctuation">.</span>count<span class="token punctuation">,</span> mu2<span class="token punctuation">.</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 输出 1, 1</li><li>C: 输出 1, 2</li><li>D: panic</li></ul><h3 id="_6-pool" tabindex="-1"><a class="header-anchor" href="#_6-pool" aria-hidden="true">#</a> 6 Pool</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">var</span> pool <span class="token operator">=</span> sync<span class="token punctuation">.</span>Pool<span class="token punctuation">{</span>New<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">new</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">28</span><span class="token punctuation">)</span> <span class="token comment">// 256MiB</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span> <span class="token punctuation">{</span>
				<span class="token function">processRequest</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token comment">// 1KiB</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> stats runtime<span class="token punctuation">.</span>MemStats
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		runtime<span class="token punctuation">.</span><span class="token function">ReadMemStats</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>stats<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Cycle %d: %dB\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> stats<span class="token punctuation">.</span>Alloc<span class="token punctuation">)</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		runtime<span class="token punctuation">.</span><span class="token function">GC</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">processRequest</span><span class="token punctuation">(</span>size <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	b <span class="token operator">:=</span> pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>bytes<span class="token punctuation">.</span>Buffer<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">500</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
	b<span class="token punctuation">.</span><span class="token function">Grow</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span>
	pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Millisecond<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 可以编译，运行时正常，内存稳定</li><li>C: 可以编译，运行时内存可能暴涨</li><li>D: 可以编译，运行时内存先暴涨，但是过一会会回收掉</li></ul><h3 id="_7-channel" tabindex="-1"><a class="header-anchor" href="#_7-channel" aria-hidden="true">#</a> 7 channel</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;runtime&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> ch <span class="token keyword">chan</span> <span class="token builtin">int</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ch <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
		ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		<span class="token operator">&lt;-</span>ch
	<span class="token punctuation">}</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	c <span class="token operator">:=</span> time<span class="token punctuation">.</span><span class="token function">Tick</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token keyword">range</span> c <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;#goroutines: %d\\n&quot;</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span><span class="token function">NumGoroutine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 一段时间后总是输出 <code>#goroutines: 1</code></li><li>C: 一段时间后总是输出 <code>#goroutines: 2</code></li><li>D: panic</li></ul><h3 id="_8-channel" tabindex="-1"><a class="header-anchor" href="#_8-channel" aria-hidden="true">#</a> 8 channel</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> ch <span class="token keyword">chan</span> <span class="token builtin">int</span>
	<span class="token keyword">var</span> count <span class="token builtin">int</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		count<span class="token operator">++</span>
		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>ch
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 输出 1</li><li>C: 输出 0</li><li>D: panic</li></ul><h3 id="_9-map" tabindex="-1"><a class="header-anchor" href="#_9-map" aria-hidden="true">#</a> 9 Map</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> m sync<span class="token punctuation">.</span>Map
	m<span class="token punctuation">.</span><span class="token function">LoadOrStore</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span><span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 输出 1</li><li>C: 输出 0</li><li>D: panic</li></ul><h3 id="_10-happens-before" tabindex="-1"><a class="header-anchor" href="#_10-happens-before" aria-hidden="true">#</a> 10 happens before</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> a <span class="token builtin">int</span>
<span class="token keyword">func</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	<span class="token operator">&lt;-</span>c
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	c <span class="token operator">&lt;-</span> <span class="token number">0</span>
	<span class="token function">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>A: 不能编译</li><li>B: 输出 1</li><li>C: 输出 0</li><li>D: panic</li></ul><h2 id="答案" tabindex="-1"><a class="header-anchor" href="#答案" aria-hidden="true">#</a> 答案</h2><h3 id="_1-d" tabindex="-1"><a class="header-anchor" href="#_1-d" aria-hidden="true">#</a> 1. D</h3><p>会产生死锁<code>panic</code>，因为<code>Mutex</code> 是互斥锁。</p><h3 id="_2-d" tabindex="-1"><a class="header-anchor" href="#_2-d" aria-hidden="true">#</a> 2. D</h3><p>会产生死锁<code>panic</code>，根据<code>sync/rwmutex.go</code> 中注释可以知道，读写锁当有一个协程在等待写锁时，其他协程是不能获得读锁的，而在<code>A</code>和<code>C</code>中同一个调用链中间需要让出读锁，让写锁优先获取，而<code>A</code>的读锁又要求<code>C</code>调用完成，因此死锁。</p><h3 id="_3-d" tabindex="-1"><a class="header-anchor" href="#_3-d" aria-hidden="true">#</a> 3. D</h3><p><code>WaitGroup</code> 在调用 <code>Wait</code> 之后是不能再调用 <code>Add</code> 方法的。</p><h3 id="_4-c" tabindex="-1"><a class="header-anchor" href="#_4-c" aria-hidden="true">#</a> 4. C</h3><p>在多核CPU中，因为CPU缓存会导致多个核心中变量值不同步。</p><h3 id="_5-d" tabindex="-1"><a class="header-anchor" href="#_5-d" aria-hidden="true">#</a> 5. D</h3><p>加锁后复制变量，会将锁的状态也复制，所以<code>mu1</code> 其实是已经加锁状态，再加锁会死锁。</p><h3 id="_6-c" tabindex="-1"><a class="header-anchor" href="#_6-c" aria-hidden="true">#</a> 6. C</h3><p>个人理解，在单核CPU中，内存可能会稳定在<code>256MB</code>，如果是多核可能会暴涨。</p><h3 id="_7-c" tabindex="-1"><a class="header-anchor" href="#_7-c" aria-hidden="true">#</a> 7. C</h3><p>因为 <code>ch</code> 未初始化，写和读都会阻塞，之后被第一个协程重新赋值，导致写的<code>ch</code> 都阻塞。</p><h3 id="_8-d" tabindex="-1"><a class="header-anchor" href="#_8-d" aria-hidden="true">#</a> 8. D</h3><p><code>ch</code> 未有被初始化，关闭时会报错。</p><h3 id="_9-a" tabindex="-1"><a class="header-anchor" href="#_9-a" aria-hidden="true">#</a> 9. A</h3><p><code>sync.Map</code> 没有 <code>Len</code> 方法。</p><h3 id="_10-b" tabindex="-1"><a class="header-anchor" href="#_10-b" aria-hidden="true">#</a> 10. B</h3><p><code>c &lt;- 0</code> 会阻塞依赖于 <code>f()</code> 的执行。</p>`,51);function r(v,m){const a=p("ExternalLinkIcon");return e(),c("div",null,[u,n("p",null,[s("题目来源： "),n("a",d,[s("Go并发编程小测验： 你能答对几道题？"),o(a)])]),k])}const f=t(l,[["render",r],["__file","q015.html.vue"]]);export{f as default};
