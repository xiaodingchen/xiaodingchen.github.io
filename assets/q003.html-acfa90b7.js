import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,a as r}from"./app-a3613753.js";const i={},t=r(`<h2 id="翻转字符串" tabindex="-1"><a class="header-anchor" href="#翻转字符串" aria-hidden="true">#</a> 翻转字符串</h2><p><strong>问题描述</strong></p><p>请实现一个算法，在不使用【额外数据结构和储存空间】的情况下，翻转一个给定的字符串(可以使用单个过程变量)。</p><p>给定一个string，请返回一个string，为翻转后的字符串。保证字符串的长度小于等于5000。</p><p><strong>解题思路</strong></p><p>翻转字符串其实是将一个字符串以中间字符为轴，前后翻转，即将str[len]赋值给str[0],将str[0] 赋值 str[len]。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func reverString(s string) (string, bool) {
    str := []rune(s)
    l := len(str)
    if l &gt; 5000 {
        return s, false
    }
    for i := 0; i &lt; l/2; i++ {
        str[i], str[l-1-i] = str[l-1-i], str[i]
    }
    return string(str), true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>以字符串长度的1/2为轴，前后赋值</p>`,10),l=[t];function d(a,c){return e(),s("div",null,l)}const u=n(i,[["render",d],["__file","q003.html.vue"]]);export{u as default};
