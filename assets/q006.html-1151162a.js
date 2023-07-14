import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as e,a as t}from"./app-5c6114be.js";const s={},d=t(`<h2 id="机器人坐标问题" tabindex="-1"><a class="header-anchor" href="#机器人坐标问题" aria-hidden="true">#</a> 机器人坐标问题</h2><p><strong>问题描述</strong></p><p>有一个机器人，给一串指令，L左转 R右转，F前进一步，B后退一步，问最后机器人的坐标，最开始，机器人位于 0 0，方向为正Y。<br> 可以输入重复指令n ： 比如 R2(LF) 这个等于指令 RLFLF。<br> 问最后机器人的坐标是多少？</p><p><strong>解题思路</strong></p><p>这里的一个难点是解析重复指令。主要指令解析成功，计算坐标就简单了。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main

import (
	&quot;unicode&quot;
)

const (
	Left = iota
	Top
	Right
	Bottom
)

func main() {
	println(move(&quot;R2(LF)&quot;, 0, 0, Top))
}

func move(cmd string, x0 int, y0 int, z0 int) (x, y, z int) {
	x, y, z = x0, y0, z0
	repeat := 0
	repeatCmd := &quot;&quot;
	for _, s := range cmd {
		switch {
		case unicode.IsNumber(s):
			repeat = repeat*10 + (int(s) - &#39;0&#39;)
		case s == &#39;)&#39;:
			for i := 0; i &lt; repeat; i++ {
				x, y, z = move(repeatCmd, x, y, z)
			}
			repeat = 0
			repeatCmd = &quot;&quot;
		case repeat &gt; 0 &amp;&amp; s != &#39;(&#39; &amp;&amp; s != &#39;)&#39;:
			repeatCmd = repeatCmd + string(s)
		case s == &#39;L&#39;:
			z = (z + 1) % 4
		case s == &#39;R&#39;:
			z = (z - 1 + 4) % 4
		case s == &#39;F&#39;:
			switch {
			case z == Left || z == Right:
				x = x - z + 1
			case z == Top || z == Bottom:
				y = y - z + 2
			}
		case s == &#39;B&#39;:
			switch {
			case z == Left || z == Right:
				x = x + z - 1
			case z == Top || z == Bottom:
				y = y + z - 2
			}
		}
	}
	return
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>这里使用三个值表示机器人当前的状况，分别是：x表示x坐标，y表示y坐标，z表示当前方向。<br> L、R 命令会改变值z，F、B命令会改变值x、y。<br> 值x、y的改变还受当前的z值影响。</p><p>如果是重复指令，那么将重复次数和重复的指令存起来递归调用即可。</p>`,10),l=[d];function v(a,r){return i(),e("div",null,l)}const u=n(s,[["render",v],["__file","q006.html.vue"]]);export{u as default};
