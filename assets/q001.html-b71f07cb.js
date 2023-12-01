import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as e,a as i}from"./app-f916d83f.js";const s={},d=i(`<h2 id="交替打印数字和字母" tabindex="-1"><a class="header-anchor" href="#交替打印数字和字母" aria-hidden="true">#</a> 交替打印数字和字母</h2><p><strong>问题描述</strong></p><p>使用两个 <code>goroutine</code> 交替打印序列，一个 <code>goroutine</code> 打印数字， 另外一个 <code>goroutine</code> 打印字母， 最终效果如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>12AB34CD56EF78GH910IJ1112KL1314MN1516OP1718QR1920ST2122UV2324WX2526YZ2728
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解题思路</strong></p><p>问题很简单，使用 channel 来控制打印的进度。使用两个 channel ，来分别控制数字和字母的打印序列， 数字打印完成后通过 channel 通知字母打印, 字母打印完成后通知数字打印，然后周而复始的工作。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	letter,number := make(chan bool),make(chan bool)
	wait := sync.WaitGroup{}

	go func() {
		i := 1
		for {
			select {
			case &lt;-number:
				fmt.Print(i)
				i++
				fmt.Print(i)
				i++
				letter &lt;- true
			}
		}
	}()
	wait.Add(1)
	go func(wait *sync.WaitGroup) {
		i := &#39;A&#39;
		for{
			select {
			case &lt;-letter:
				if i &gt;= &#39;Z&#39; {
					wait.Done()
					return
				}

				fmt.Print(string(i))
				i++
				fmt.Print(string(i))
				i++
				number &lt;- true
			}

		}
	}(&amp;wait)
	number&lt;-true
	wait.Wait()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>这里用到了两个<code>channel</code>负责通知，letter负责通知打印字母的goroutine来打印字母，number用来通知打印数字的goroutine打印数字。</p><p>wait用来等待字母打印完成后退出循环。</p>`,11),l=[d];function r(a,c){return t(),e("div",null,l)}const m=n(s,[["render",r],["__file","q001.html.vue"]]);export{m as default};
