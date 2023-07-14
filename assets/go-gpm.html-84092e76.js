const t=JSON.parse('{"key":"v-3b39a20c","path":"/golang/go-gpm.html","title":"Go语言的GPM调度器是什么？","lang":"zh-CN","frontmatter":{"order":8,"category":["golang"],"tag":["go","goroutine","源码","面试","面试总结"],"description":"相信很多人都听说过Go语言天然支持高并发，原因是内部有协程（goroutine）加持，可以在一个进程中启动成千上万个协程。那么，它凭什么做到如此高的并发呢？那就需要先了解什么是并发模型。 并发模型 著名的C++专家Herb Sutter曾经说过“免费的午餐已经终结”。为了让代码运行的更快，单纯依靠更快的硬件已经无法得到满足，我们需要利用多核来挖掘并行的...","head":[["meta",{"property":"og:url","content":"https://www.ixlymsy.top/golang/go-gpm.html"}],["meta",{"property":"og:site_name","content":"个人成长全记录-码说256"}],["meta",{"property":"og:title","content":"Go语言的GPM调度器是什么？"}],["meta",{"property":"og:description","content":"相信很多人都听说过Go语言天然支持高并发，原因是内部有协程（goroutine）加持，可以在一个进程中启动成千上万个协程。那么，它凭什么做到如此高的并发呢？那就需要先了解什么是并发模型。 并发模型 著名的C++专家Herb Sutter曾经说过“免费的午餐已经终结”。为了让代码运行的更快，单纯依靠更快的硬件已经无法得到满足，我们需要利用多核来挖掘并行的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T15:22:37.000Z"}],["meta",{"property":"article:author","content":"码说256"}],["meta",{"property":"article:tag","content":"go"}],["meta",{"property":"article:tag","content":"goroutine"}],["meta",{"property":"article:tag","content":"源码"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"面试总结"}],["meta",{"property":"article:modified_time","content":"2023-07-14T15:22:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Go语言的GPM调度器是什么？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T15:22:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"码说256\\",\\"url\\":\\"https://www.ixlymsy.top\\"}]}"]]},"headers":[{"level":2,"title":"并发模型","slug":"并发模型","link":"#并发模型","children":[{"level":3,"title":"CSP篇","slug":"csp篇","link":"#csp篇","children":[]},{"level":3,"title":"GPM调度模型","slug":"gpm调度模型","link":"#gpm调度模型","children":[]},{"level":3,"title":"Goroutine","slug":"goroutine","link":"#goroutine","children":[]},{"level":3,"title":"Processor","slug":"processor","link":"#processor","children":[]},{"level":3,"title":"三者的关系","slug":"三者的关系","link":"#三者的关系","children":[]}]},{"level":2,"title":"系统调用","slug":"系统调用","link":"#系统调用","children":[]},{"level":2,"title":"sysmon","slug":"sysmon","link":"#sysmon","children":[]}],"git":{"createdTime":1689348157000,"updatedTime":1689348157000,"contributors":[{"name":"xdc","email":"1549169735@qq.com","commits":1}]},"readingTime":{"minutes":6.47,"words":1942},"filePathRelative":"golang/go-gpm.md","localizedDate":"2023年7月14日","excerpt":"","autoDesc":true}');export{t as data};
