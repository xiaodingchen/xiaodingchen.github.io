import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-53fb368d.js";const p={},e=t(`<h2 id="切片" tabindex="-1"><a class="header-anchor" href="#切片" aria-hidden="true">#</a> 切片</h2><p>切片是Golang中特有的数据类型。在Go语言中数组是固定长度的，不能动态扩容的，在编译器会固定大小。而切片是对数组的抽象，是一种灵活地&quot;动态数组&quot;，切片可以追加元素。切片是一种数据结构，切片不是数组，切片描述的是一块数据。切片声明如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> ints <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token comment">// 直接声明</span>
ints <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">}</span> <span class="token comment">// 字面量声明</span>
ints <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// make创建</span>
ints <span class="token operator">:=</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token comment">// 下表截取创建</span>
ints <span class="token operator">:=</span> <span class="token operator">*</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token comment">// new一个</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中最常用的是make创建和下标截取。切片可以通过Go内置append方法进行追加元素，当cap不够时进行动态扩容。一般cap是切片长度的两倍。切片是引用类型。</p><p>切片的内置结构：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> SliceHeader <span class="token keyword">struct</span> <span class="token punctuation">{</span>
Data <span class="token builtin">uintptr</span> <span class="token comment">// 表示该slice结构从底层数组的哪一个元素开始，该指针指向该元素</span>
Len  <span class="token builtin">int</span> <span class="token comment">// 表示slice当前的长度，如果追加元素，长度不够时会扩展，最大扩展到Capacity的长度</span>
Cap  <span class="token builtin">int</span> <span class="token comment">// 即底层数组的长度，表示这个slice目前最多能扩展到这么长</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切片的Data属性是指向切片数组的指针，这个概念很重要。若切片发生拷贝，其实质是对当前三个属性的拷贝，不管当前slice具体有多少个元素，其拷贝时间都是大差不差的。</p><p>切片的扩容<br> 切片在扩容时会进行内存对齐，这个和内存分配策略相关。进行内存对齐之后，新 slice 的容量是要 大于等于老 slice 容量的 2倍或者1.25倍，当原 slice 容量小于 1024 的时候，新 slice 容量变成原来的 2 倍；原 slice 容量超过 1024，新 slice 容量变成原来的1.25倍。</p><p>我们来关注下面的代码：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ints <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">)</span> <span class="token comment">// [0 0]</span>
    int1 <span class="token operator">:=</span> ints<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>int1<span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>int1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [0] 3</span>
    int1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">)</span> <span class="token comment">// [0 1]</span>
    int1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>int1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>int1<span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>int1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [1 2] 3</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">)</span> <span class="token comment">// [0 1]</span>
    int1<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">2</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> int1<span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>int1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [0 2] [2 2] 3</span>
    ints <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> int1<span class="token punctuation">,</span> <span class="token function">cap</span><span class="token punctuation">(</span>int1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// [0 2 3] [2 3] 3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先我们声明了一个长度为2，cap为4的int类型切片，这是个零切片。接着我们通过下标截取的方式声明了一个int类型的切片， 这个时候 int1切片的data属性的指针地址和ints的指针地址是一样的，长度为1，容量为3。我们对int1进行下标修改，同时ints对应的元素值也会修改。</p><p>接着我们使用Go内置的append函数对int1进行追加，使之长度发生了改变，这个时候int1的长度小于容量，指针不会被重新分配，但是追加数据不会影响ints，因为ints的长度为2，下标未满足条件，访问不了int1追加的元素。</p><p>接着我们使用Go内置的append函数对ints进行追加，使之长度发生了改变，这个时候ints的长度小于容量，指针不会被重新分配，但是追加数据会影响int1，在底层数组上int1是ints的子集。</p><p>range遍历切片有什么要注意的？</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    users <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>User<span class="token punctuation">{</span>
        <span class="token punctuation">{</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span> <span class="token number">34</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> users<span class="token punctuation">{</span>
        <span class="token keyword">if</span> v<span class="token punctuation">.</span>Age <span class="token operator">!=</span> <span class="token number">20</span><span class="token punctuation">{</span>
            v<span class="token punctuation">.</span>Age <span class="token operator">=</span> <span class="token number">20</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span> <span class="token comment">// [{张三 18} {李四 34} {王五 21}]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用range遍历切片users，变量v是拷贝切片中的数据，修改拷贝数据不会对原切片有影响。</p>`,16),c=[e];function o(i,u){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","slice1.html.vue"]]);export{r as default};
