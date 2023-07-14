import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as t,a as s}from"./app-3791dda3.js";const r={},i=s(`<h2 id="字符串替换问题" tabindex="-1"><a class="header-anchor" href="#字符串替换问题" aria-hidden="true">#</a> 字符串替换问题</h2><p><strong>问题描述</strong></p><p>请编写一个方法，将字符串中的空格全部替换为“%20”。<br> 假定该字符串有足够的空间存放新增的字符，并且知道字符串的真实长度(小于等于1000)，同时保证字符串由【大小写的英文字母组成】。<br> 给定一个string为原始的串，返回替换后的string。</p><p><strong>解题思路</strong></p><p>两个问题，第一个是只能是英文字母，第二个是替换空格。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func replaceBlank(s string) (string, bool) {
	if len([]rune(s)) &gt; 1000 {
		return s, false
	}
	for _, v := range s {
		if string(v) != &quot; &quot; &amp;&amp; unicode.IsLetter(v) == false {
			return s, false
		}
	}
	return strings.Replace(s, &quot; &quot;, &quot;%20&quot;, -1), true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>这里使用了golang内置方法<code>unicode.IsLetter</code>判断字符是否是字母，之后使用<code>strings.Replace</code>来替换空格。</p>`,9),a=[i];function d(l,o){return n(),t("div",null,a)}const v=e(r,[["render",d],["__file","q005.html.vue"]]);export{v as default};
