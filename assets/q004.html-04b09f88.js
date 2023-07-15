import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as e,a as i}from"./app-a3613753.js";const t={},r=i(`<h2 id="判断两个给定的字符串排序后是否一致" tabindex="-1"><a class="header-anchor" href="#判断两个给定的字符串排序后是否一致" aria-hidden="true">#</a> 判断两个给定的字符串排序后是否一致</h2><p><strong>问题描述</strong></p><p>给定两个字符串，请编写程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。<br> 这里规定【大小写为不同字符】，且考虑字符串重点空格。给定一个string s1和一个string s2，请返回一个bool，代表两串是否重新排列后可相同。<br> 保证两串的长度都小于等于5000。</p><p><strong>解题思路</strong></p><p>首先要保证字符串长度小于5000。之后只需要一次循环遍历s1中的字符在s2是否都存在即可。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func isRegroup(s1,s2 string) bool {
	sl1 := len([]rune(s1))
	sl2 := len([]rune(s2))

	if sl1 &gt; 5000 || sl2 &gt; 5000 || sl1 != sl2{
		return false
	}

	for _,v := range s1 {
		if strings.Count(s1,string(v)) != strings.Count(s2,string(v)) {
			return false
		}
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>这里还是使用golang内置方法 <code>strings.Count</code> 来判断字符是否一致。</p>`,9),l=[r];function d(a,c){return s(),e("div",null,l)}const u=n(t,[["render",d],["__file","q004.html.vue"]]);export{u as default};
