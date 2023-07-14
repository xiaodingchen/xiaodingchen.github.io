const t=JSON.parse('{"key":"v-49611dec","path":"/golang/interview/q011.html","title":"高并发下的锁与map的读写","lang":"zh-CN","frontmatter":{"order":11,"category":["golang"],"tag":["go","golang","map","interface","struct","源码","面试","面试总结"],"description":"场景：在一个高并发的web服务器中，要限制IP的频繁访问。现模拟100个IP同时并发访问服务器，每个IP要重复访问1000次。 每个IP三分钟之内只能访问一次。修改以下代码完成该过程，要求能成功输出 success:100 解析 该问题主要考察了并发情况下map的读写问题，而给出的初始代码，又存在for循环中启动goroutine时变量使用问题以及go...","head":[["meta",{"property":"og:url","content":"https://www.ixlymsy.top/golang/interview/q011.html"}],["meta",{"property":"og:site_name","content":"个人成长全记录-码说256"}],["meta",{"property":"og:title","content":"高并发下的锁与map的读写"}],["meta",{"property":"og:description","content":"场景：在一个高并发的web服务器中，要限制IP的频繁访问。现模拟100个IP同时并发访问服务器，每个IP要重复访问1000次。 每个IP三分钟之内只能访问一次。修改以下代码完成该过程，要求能成功输出 success:100 解析 该问题主要考察了并发情况下map的读写问题，而给出的初始代码，又存在for循环中启动goroutine时变量使用问题以及go..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T15:02:55.000Z"}],["meta",{"property":"article:author","content":"码说256"}],["meta",{"property":"article:tag","content":"go"}],["meta",{"property":"article:tag","content":"golang"}],["meta",{"property":"article:tag","content":"map"}],["meta",{"property":"article:tag","content":"interface"}],["meta",{"property":"article:tag","content":"struct"}],["meta",{"property":"article:tag","content":"源码"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"面试总结"}],["meta",{"property":"article:modified_time","content":"2023-07-14T15:02:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"高并发下的锁与map的读写\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T15:02:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"码说256\\",\\"url\\":\\"https://www.ixlymsy.top\\"}]}"]]},"headers":[],"git":{"createdTime":1689346975000,"updatedTime":1689346975000,"contributors":[{"name":"xdc","email":"1549169735@qq.com","commits":1}]},"readingTime":{"minutes":1.66,"words":497},"filePathRelative":"golang/interview/q011.md","localizedDate":"2023年7月14日","excerpt":"","autoDesc":true}');export{t as data};
