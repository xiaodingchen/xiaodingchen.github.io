import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-53fb368d.js";const p={},e=t(`<p>在上一个总结中我们在实现线程安全的map的时候用到了锁的概念，面试官听到这个锁的实现方法之后双眼冒光，开始了新一轮的攻势。问：互斥锁和读写锁有啥区别？</p><h3 id="sync-mutex互斥锁" tabindex="-1"><a class="header-anchor" href="#sync-mutex互斥锁" aria-hidden="true">#</a> sync.Mutex互斥锁</h3><p>Go中标准包提供sync.Mutex类型实现mutex(排他锁、互斥锁)。定义：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// A Mutex is a mutual exclusion lock.</span>
<span class="token comment">// The zero value for a Mutex is an unlocked mutex.</span>
<span class="token comment">//</span>
<span class="token comment">// A Mutex must not be copied after first use.</span>
<span class="token keyword">type</span> Mutex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	state <span class="token builtin">int32</span>
	sema <span class="token builtin">uint32</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sync.Mutex提供两个方法，Lock()方法获取锁，UnLock()释放锁。一旦被锁住，其他的Lock操作将无法进行，直到其被UnLock。在goruntine中已有的锁在没有被释放前去获取锁，那么这个gorutine将会被阻塞，只有在UnLock后才会解除阻塞。案例：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> i <span class="token builtin">int</span>
<span class="token keyword">var</span> m sync<span class="token punctuation">.</span>Mutex

<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	i<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> i
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">noLockRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> i
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
	<span class="token keyword">for</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>j <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;nolock&quot;</span><span class="token punctuation">,</span> j<span class="token punctuation">,</span> <span class="token function">noLockRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到在代码案例中我们对共享的变量i进行加和读操作，add方法中使用了互斥锁，记住：**在Lock()和Unlock()之间的代码段称为资源的临界区(critical section)，在这一区间内的代码是严格被Lock()保护的，是线程安全的，任何一个时间点都只能有一个goroutine执行这段区间的代码。**由于add和read操作都会使用到锁，所以20个goruntine将会产生40个资源临界区，Lock保证了在一个时间点只有其中一个goruntine可以访问其中一个临界区，当释放了释放了一个临界区，其他的Lock将会竞争互斥锁，这个叫做锁竞争。因为竞争的存在，这40个临界区是随机被访问的，所以是无序的，总结下来就是：<strong>Mutex保证了每个资源临界区的安全，某一时间点只有一个goroutine访问到这部分，但也因此而出现了随机性。</strong></p><p>在Go中允许这样：如果在一个地方Lock()，在另一个地方不Lock()而是直接修改或访问共享数据，这对于sync.Mutex类型来说是允许的，因为mutex不会和goroutine进行关联。</p><blockquote><p>根据上述的结论，在上个总结的线程安全的map一文中是有一处错误的，那就是使用锁机制实现的线程安全的map，也是无法保证操作顺序的，只能保证map是线程安全的。</p></blockquote><h3 id="sync-rwmutex读写锁" tabindex="-1"><a class="header-anchor" href="#sync-rwmutex读写锁" aria-hidden="true">#</a> sync.RWMutex读写锁</h3><p>看下这个结构的定义：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> RWMutex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	w           Mutex  <span class="token comment">// held if there are pending writers</span>
	writerSem   <span class="token builtin">uint32</span> <span class="token comment">// 写锁需要等待读锁释放的信号量</span>
	readerSem   <span class="token builtin">uint32</span> <span class="token comment">// 读锁需要等待写锁释放的信号量</span>
	readerCount <span class="token builtin">int32</span>  <span class="token comment">// 表示当前启用的读者数量，包括了所有正在临界区里面的读者或者被写锁阻塞的等待进入临界区读者的数量。相当于是当前调用了 RLock 函数并且还没调用 RUnLock 函数的读者的数量。</span>
	readerWait  <span class="token builtin">int32</span>  <span class="token comment">// 用来记录在获取写锁之前，需要等待多少读锁释放的数量。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的代码我们可以看出：</p><ol><li>Go中的读写锁是基于互斥锁的</li><li>读写锁允许有多个读锁和一个写锁 <ul><li>可以同时申请多个读锁</li><li>有写锁时，申请读锁和写锁将会阻塞</li><li>读写锁常被用于读多写少的场景</li></ul></li></ol><p><code>func (rw *RWMutex) Lock()</code>　写锁，如果在添加写锁之前已经有其他的读锁和写锁，则lock就会阻塞直到该锁可用，为确保该锁最终可用，已阻塞的 Lock 调用会从获得的锁中排除新的读取器，即写锁权限高于读锁，有写锁时优先进行写锁定。</p><p><code>func (rw *RWMutex) Unlock()</code> 写锁解锁，如果没有进行写锁定，则就会引起一个运行时错误</p><p><code>func (rw *RWMutex) RLock()</code> 读锁，当有写锁时，无法加载读锁，当只有读锁或者没有锁时，可以加载读锁，读锁可以加载多个，所以适用于＂读多写少＂的场景</p><p><code>func (rw *RWMutex)RUnlock()</code> 读锁解锁，RUnlock 撤销单次 RLock 调用，一次RUnlock()操作只是对读锁数量减1，即减少一次读锁的引用计数，如果没有进行写锁定，则就会引起一个运行时错误</p><p>案例：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;log&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> myMap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	rw   sync<span class="token punctuation">.</span>RWMutex
	m    sync<span class="token punctuation">.</span>Mutex
	data <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>myMap<span class="token punctuation">)</span> <span class="token function">add</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">,</span> val <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span>rw<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;add&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
	<span class="token comment">//time.Sleep(time.Second * 3)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span>rw<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	m<span class="token punctuation">.</span>data<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>myMap<span class="token punctuation">)</span> <span class="token function">mFind</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span>m<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;mfind&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
	<span class="token comment">//time.Sleep(time.Second)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span>m<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>data<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>myMap<span class="token punctuation">)</span> <span class="token function">rwFind</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	m<span class="token punctuation">.</span>rw<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;rwfind&quot;</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
	<span class="token comment">//time.Sleep(time.Second)</span>
	<span class="token keyword">defer</span> m<span class="token punctuation">.</span>rw<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>data<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	wg <span class="token operator">:=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>
	m <span class="token operator">:=</span> <span class="token operator">&amp;</span>myMap<span class="token punctuation">{</span>data<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
	key <span class="token operator">:=</span> <span class="token string">&quot;a&quot;</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			m<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> i<span class="token punctuation">)</span>

		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;mfor&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> m<span class="token punctuation">.</span><span class="token function">mFind</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;rwfor&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> m<span class="token punctuation">.</span><span class="token function">rwFind</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中我们定义了一个结构体，里面的属性一个是互斥锁，一个是读写锁，还有个map结构。mFind方法通过互斥锁去读map数据，rwFind方法通过读写锁去读取数据。当使用mFind读取数据时，我们发现读数据和写数据互不冲突，读和读却是冲突的，因为是互斥锁。使用rwFind读取数据，虽然读锁不冲突，因为读写锁可以多次获取读锁，但是若一个写锁在占用锁，那多个读锁就都会阻塞，要等待写锁完成释放后，读锁才会继续执行。</p><h3 id="sync-mutex和sync-rwmutex如何选择" tabindex="-1"><a class="header-anchor" href="#sync-mutex和sync-rwmutex如何选择" aria-hidden="true">#</a> sync.Mutex和sync.RWMutex如何选择</h3><p>Mutex和RWMutex都不关联goroutine，它们的锁申请行为可以在一个goroutine中操作，释放锁行为可以在另一个goroutine中操作。但RWMutex显然更适用于读多写少的场景。仅针对读的性能来说，RWMutex要高于Mutex，因为rwmutex的多个读可以并存。</p>`,23),c=[e];function o(i,u){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","mux1.html.vue"]]);export{d as default};
