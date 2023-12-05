import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,a as s}from"./app-23d1540c.js";const t={},d=s(`<h2 id="判断字符串中字符是否全都不同" tabindex="-1"><a class="header-anchor" href="#判断字符串中字符是否全都不同" aria-hidden="true">#</a> 判断字符串中字符是否全都不同</h2><p><strong>问题描述</strong></p><p>请实现一个算法，确定一个字符串的所有字符【是否全都不同】。这里我们要求【不允许使用额外的存储结构】。<br> 给定一个string，请返回一个bool值,true代表所有字符全都不同，false代表存在相同的字符。<br> 保证字符串中的字符为【ASCII字符】。字符串的长度小于等于【3000】。</p><p><strong>解题思路</strong></p><p>这里有几个重点，第一个是<code>ASCII字符</code>，<code>ASCII字符</code>字符一共有256个，其中128个是常用字符，可以在键盘上输入。128之后的是键盘上无法找到的。</p><p>然后是全部不同，也就是字符串中的字符没有重复的，再次，不准使用额外的储存结构，且字符串小于等于3000。</p><p>如果允许其他额外储存结构，这个题目很好做。如果不允许的话，可以使用golang内置的方式实现。</p><p><strong>源码参考</strong></p><p>通过<code>strings.Count</code> 函数判断：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func isUniqueString(s string) bool {
	if strings.Count(s,&quot;&quot;) &gt; 3000{
		return  false
	}
	for _,v := range s {
		if v &gt; 127 {
			return false
		}
		if strings.Count(s,string(v)) &gt; 1 {
			return false
		}
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>strings.Index</code>和<code>strings.LastIndex</code>函数判断：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func isUniqueString2(s string) bool {
	if strings.Count(s,&quot;&quot;) &gt; 3000{
		return  false
	}
	for k,v := range s {
		if v &gt; 127 {
			return false
		}
		if strings.Index(s,string(v)) != k {
			return false
		}
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过位运算判断</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func isUniqString3(s string) bool {
	if len(s) == 0 || len(s) &gt; 3000 {
		return false
	}
	// 256 个字符 256 = 64 + 64 + 64 + 64
	var mark1, mark2, mark3, mark4 uint64
	var mark *uint64
	for _, r := range s {
		n := uint64(r)
		if n &lt; 64 {
			mark = &amp;mark1
		} else if n &lt; 128 {
			mark = &amp;mark2
			n -= 64
		} else if n &lt; 192 {
			mark = &amp;mark3
			n -= 128
		} else {
			mark = &amp;mark4
			n -= 192
		}
		if (*mark)&amp;(1&lt;&lt;n) != 0 {
			return false
		}
		*mark = (*mark) | uint64(1&lt;&lt;n)
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>以上三种方法都可以实现这个算法。</p><p>第一个方法使用的是golang内置方法<code>strings.Count</code>,可以用来判断在一个字符串中包含的另外一个字符串的数量。</p><p>第二个方法使用的是golang内置方法<code>strings.Index</code>和<code>strings.LastIndex</code>，用来判断指定字符串在另外一个字符串的索引未知，分别是第一次发现位置和最后发现位置。</p><p>第三个方法使用的是位运算来判断是否重复，时间复杂度为o(n)，相比前两个方法时间复杂度低</p>`,19),r=[d];function l(a,v){return e(),i("div",null,r)}const m=n(t,[["render",l],["__file","q002.html.vue"]]);export{m as default};
