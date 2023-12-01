import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-f916d83f.js";const p={},e=t(`<h1 id="常见语法题目-二" tabindex="-1"><a class="header-anchor" href="#常见语法题目-二" aria-hidden="true">#</a> 常见语法题目 二</h1><h3 id="_1、写出下面代码输出内容。" tabindex="-1"><a class="header-anchor" href="#_1、写出下面代码输出内容。" aria-hidden="true">#</a> 1、写出下面代码输出内容。</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">defer_call</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">defer_call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;打印前&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;打印中&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;打印后&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;触发异常&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p><code>defer</code> 关键字的实现跟go关键字很类似，不同的是它调用的是<code>runtime.deferproc</code>而不是<code>runtime.newproc</code>。</p><p>在<code>defer</code>出现的地方，插入了指令<code>call runtime.deferproc</code>，然后在函数返回之前的地方，插入指令<code>call runtime.deferreturn</code>。</p><p>goroutine的控制结构中，有一张表记录<code>defer</code>，调用<code>runtime.deferproc</code>时会将需要defer的表达式记录在表中，而在调用<code>runtime.deferreturn</code>的时候，则会依次从defer表中出栈并执行。</p><p>因此，题目最后输出顺序应该是<code>defer</code> 定义顺序的倒序。<code>panic</code> 错误并不能终止 <code>defer</code> 的执行。</p><h3 id="_2、-以下代码有什么问题-说明原因" tabindex="-1"><a class="header-anchor" href="#_2、-以下代码有什么问题-说明原因" aria-hidden="true">#</a> 2、 以下代码有什么问题，说明原因</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name <span class="token builtin">string</span>
	Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">pase_student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>student<span class="token punctuation">)</span>
	stus <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>student<span class="token punctuation">{</span>
		<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;zhou&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">24</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;li&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">23</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;wang&quot;</span><span class="token punctuation">,</span> Age<span class="token punctuation">:</span> <span class="token number">22</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> stu <span class="token operator">:=</span> <span class="token keyword">range</span> stus <span class="token punctuation">{</span>
		m<span class="token punctuation">[</span>stu<span class="token punctuation">.</span>Name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>stu
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>golang 的 <code>for ... range</code> 语法中，<code>stu</code> 变量会被复用，每次循环会将集合中的值复制给这个变量，因此，会导致最后<code>m</code>中的<code>map</code>中储存的都是<code>stus</code>最后一个<code>student</code>的值。</p><h3 id="_3、下面的代码会输出什么-并说明原因" tabindex="-1"><a class="header-anchor" href="#_3、下面的代码会输出什么-并说明原因" aria-hidden="true">#</a> 3、下面的代码会输出什么，并说明原因</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	runtime<span class="token punctuation">.</span><span class="token function">GOMAXPROCS</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	wg <span class="token operator">:=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;i: &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;i: &quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
			wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>这个输出结果决定来自于调度器优先调度哪个G。从runtime的源码可以看到，当创建一个G时，会优先放入到下一个调度的<code>runnext</code>字段上作为下一次优先调度的G。因此，最先输出的是最后创建的G，也就是9.</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">newproc</span><span class="token punctuation">(</span>siz <span class="token builtin">int32</span><span class="token punctuation">,</span> fn <span class="token operator">*</span>funcval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	argp <span class="token operator">:=</span> <span class="token function">add</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>fn<span class="token punctuation">)</span><span class="token punctuation">,</span> sys<span class="token punctuation">.</span>PtrSize<span class="token punctuation">)</span>
	gp <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	pc <span class="token operator">:=</span> <span class="token function">getcallerpc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">systemstack</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		newg <span class="token operator">:=</span> <span class="token function">newproc1</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> argp<span class="token punctuation">,</span> siz<span class="token punctuation">,</span> gp<span class="token punctuation">,</span> pc<span class="token punctuation">)</span>

		_p_ <span class="token operator">:=</span> <span class="token function">getg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>m<span class="token punctuation">.</span>p<span class="token punctuation">.</span><span class="token function">ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">//新创建的G会调用这个方法来决定如何调度</span>
		<span class="token function">runqput</span><span class="token punctuation">(</span>_p_<span class="token punctuation">,</span> newg<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

		<span class="token keyword">if</span> mainStarted <span class="token punctuation">{</span>
			<span class="token function">wakep</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span>

	<span class="token keyword">if</span> next <span class="token punctuation">{</span>
	retryNext<span class="token punctuation">:</span>
		oldnext <span class="token operator">:=</span> _p_<span class="token punctuation">.</span>runnext
        <span class="token comment">//当next是true时总会将新进来的G放入下一次调度字段中</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>_p_<span class="token punctuation">.</span>runnext<span class="token punctuation">.</span><span class="token function">cas</span><span class="token punctuation">(</span>oldnext<span class="token punctuation">,</span> <span class="token function">guintptr</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Pointer</span><span class="token punctuation">(</span>gp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">goto</span> retryNext
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> oldnext <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Kick the old runnext out to the regular run queue.</span>
		gp <span class="token operator">=</span> oldnext<span class="token punctuation">.</span><span class="token function">ptr</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、下面代码会输出什么" tabindex="-1"><a class="header-anchor" href="#_4、下面代码会输出什么" aria-hidden="true">#</a> 4、下面代码会输出什么？</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> People <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>People<span class="token punctuation">)</span> <span class="token function">ShowA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;showA&quot;</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span><span class="token function">ShowB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>People<span class="token punctuation">)</span> <span class="token function">ShowB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;showB&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Teacher <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	People
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>Teacher<span class="token punctuation">)</span> <span class="token function">ShowB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;teacher showB&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	t <span class="token operator">:=</span> Teacher<span class="token punctuation">{</span><span class="token punctuation">}</span>
	t<span class="token punctuation">.</span><span class="token function">ShowA</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>输出结果为<code>showA</code>、<code>showB</code>。golang 语言中没有继承概念，只有组合，也没有虚方法，更没有重载。因此，<code>*Teacher</code> 的 <code>ShowB</code> 不会覆写被组合的 <code>People</code> 的方法。</p><h3 id="_5、下面代码会触发异常吗-请详细说明" tabindex="-1"><a class="header-anchor" href="#_5、下面代码会触发异常吗-请详细说明" aria-hidden="true">#</a> 5、下面代码会触发异常吗？请详细说明</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	runtime<span class="token punctuation">.</span><span class="token function">GOMAXPROCS</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	int_chan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	string_chan <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	int_chan <span class="token operator">&lt;-</span> <span class="token number">1</span>
	string_chan <span class="token operator">&lt;-</span> <span class="token string">&quot;hello&quot;</span>
	<span class="token keyword">select</span> <span class="token punctuation">{</span>
	<span class="token keyword">case</span> value <span class="token operator">:=</span> <span class="token operator">&lt;-</span>int_chan<span class="token punctuation">:</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
	<span class="token keyword">case</span> value <span class="token operator">:=</span> <span class="token operator">&lt;-</span>string_chan<span class="token punctuation">:</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>结果是随机执行。golang 在多个<code>case</code> 可读的时候会公平的选中一个执行。</p><h3 id="_6、下面代码输出什么" tabindex="-1"><a class="header-anchor" href="#_6、下面代码输出什么" aria-hidden="true">#</a> 6、下面代码输出什么？</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">calc</span><span class="token punctuation">(</span>index <span class="token builtin">string</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	ret <span class="token operator">:=</span> a <span class="token operator">+</span> b
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> ret<span class="token punctuation">)</span>
	<span class="token keyword">return</span> ret
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a <span class="token operator">:=</span> <span class="token number">1</span>
	b <span class="token operator">:=</span> <span class="token number">2</span>
	<span class="token keyword">defer</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token string">&quot;10&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
	a <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token keyword">defer</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token string">&quot;20&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>
	b <span class="token operator">=</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>输出结果为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10 1 2 3
20 0 2 2
2 0 2 2
1 1 3 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>defer</code> 在定义的时候会计算好调用函数的参数，所以会优先输出<code>10</code>、<code>20</code> 两个参数。然后根据定义的顺序倒序执行。</p><h3 id="_7、请写出以下输入内容" tabindex="-1"><a class="header-anchor" href="#_7、请写出以下输入内容" aria-hidden="true">#</a> 7、请写出以下输入内容</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
	s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>输出为 <code>0 0 0 0 0 1 2 3</code>。</p><p><code>make</code> 在初始化切片时指定了长度，所以追加数据时会从<code>len(s)</code> 位置开始填充数据。</p><h3 id="_8、下面的代码有什么问题" tabindex="-1"><a class="header-anchor" href="#_8、下面的代码有什么问题" aria-hidden="true">#</a> 8、下面的代码有什么问题?</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> UserAges <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ages <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span>
	sync<span class="token punctuation">.</span>Mutex
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>ua <span class="token operator">*</span>UserAges<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> age <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ua<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> ua<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	ua<span class="token punctuation">.</span>ages<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> age
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>ua <span class="token operator">*</span>UserAges<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> age<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ua<span class="token punctuation">.</span>ages<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> age
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>在执行 Get方法时可能被thorw。</p><p>虽然有使用sync.Mutex做写锁，但是map是并发读写不安全的。map属于引用类型，并发读写时多个协程见是通过指针访问同一个地址，即访问共享变量，此时同时读写资源存在竞争关系。会报错误信息:“fatal error: concurrent map read and map write”。</p><p>因此，在 <code>Get</code> 中也需要加锁，因为这里只是读，建议使用读写锁 <code>sync.RWMutex</code>。</p><h3 id="_9、下面的迭代会有什么问题" tabindex="-1"><a class="header-anchor" href="#_9、下面的迭代会有什么问题" aria-hidden="true">#</a> 9、下面的迭代会有什么问题？</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>set <span class="token operator">*</span>threadSafeSet<span class="token punctuation">)</span> <span class="token function">Iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		set<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

		<span class="token keyword">for</span> elem <span class="token operator">:=</span> <span class="token keyword">range</span> set<span class="token punctuation">.</span>s <span class="token punctuation">{</span>
			ch <span class="token operator">&lt;-</span> elem
		<span class="token punctuation">}</span>

		<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
		set<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> ch
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>默认情况下 <code>make</code> 初始化的 <code>channel</code> 是无缓冲的，也就是在迭代写时会阻塞。</p><h3 id="_10、以下代码能编译过去吗-为什么" tabindex="-1"><a class="header-anchor" href="#_10、以下代码能编译过去吗-为什么" aria-hidden="true">#</a> 10、以下代码能编译过去吗？为什么？</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> People <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Speak</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>stu <span class="token operator">*</span>Student<span class="token punctuation">)</span> <span class="token function">Speak</span><span class="token punctuation">(</span>think <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>talk <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> think <span class="token operator">==</span> <span class="token string">&quot;bitch&quot;</span> <span class="token punctuation">{</span>
		talk <span class="token operator">=</span> <span class="token string">&quot;You are a good boy&quot;</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		talk <span class="token operator">=</span> <span class="token string">&quot;hi&quot;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> peo People <span class="token operator">=</span> Student<span class="token punctuation">{</span><span class="token punctuation">}</span>
	think <span class="token operator">:=</span> <span class="token string">&quot;bitch&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>peo<span class="token punctuation">.</span><span class="token function">Speak</span><span class="token punctuation">(</span>think<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>编译失败，值类型 <code>Student{}</code> 未实现接口<code>People</code>的方法，不能定义为 <code>People</code>类型。</p><p>在 golang 语言中，<code>Student</code> 和 <code>*Student</code> 是两种类型，第一个是表示 <code>Student</code> 本身，第二个是指向 <code>Student</code> 的指针。</p><h3 id="_11、以下代码打印出来什么内容-说出为什么。。。" tabindex="-1"><a class="header-anchor" href="#_11、以下代码打印出来什么内容-说出为什么。。。" aria-hidden="true">#</a> 11、以下代码打印出来什么内容，说出为什么。。。</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> People <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>stu <span class="token operator">*</span>Student<span class="token punctuation">)</span> <span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">live</span><span class="token punctuation">(</span><span class="token punctuation">)</span> People <span class="token punctuation">{</span>
	<span class="token keyword">var</span> stu <span class="token operator">*</span>Student
	<span class="token keyword">return</span> stu
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">live</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;AAAAAAA&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;BBBBBBB&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析：</strong></p><p>跟上一题一样，不同的是<code>*Student</code> 的定义后本身没有初始化值，所以 <code>*Student</code> 是 <code>nil</code>的，但是<code>*Student</code> 实现了 <code>People</code> 接口，接口不为 <code>nil</code>。</p>`,55),o=[e];function c(i,u){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","q008.html.vue"]]);export{k as default};
