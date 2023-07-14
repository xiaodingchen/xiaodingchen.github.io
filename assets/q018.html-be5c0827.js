const t=JSON.parse('{"key":"v-55530a45","path":"/golang/interview/q018.html","title":"对已经关闭的的chan进行读写，会怎么样？为什么？","lang":"zh-CN","frontmatter":{"order":18,"category":["golang"],"tag":["go","golang","map","interface","struct","源码","面试","面试总结"],"description":"题目 对已经关闭的的 chan 进行读写，会怎么样？为什么？ 回答 读已经关闭的 chan 能一直读到东西，但是读到的内容根据通道内关闭前是否有元素而不同。; 如果 chan 关闭前，buffer 内有元素还未读 , 会正确读到 chan 内的值，且返回的第二个 bool 值（是否读成功）为 true。; 如果 chan 关闭前，buffer 内有元素...","head":[["meta",{"property":"og:url","content":"https://www.ixlymsy.top/golang/interview/q018.html"}],["meta",{"property":"og:site_name","content":"个人成长全记录-码说256"}],["meta",{"property":"og:title","content":"对已经关闭的的chan进行读写，会怎么样？为什么？"}],["meta",{"property":"og:description","content":"题目 对已经关闭的的 chan 进行读写，会怎么样？为什么？ 回答 读已经关闭的 chan 能一直读到东西，但是读到的内容根据通道内关闭前是否有元素而不同。; 如果 chan 关闭前，buffer 内有元素还未读 , 会正确读到 chan 内的值，且返回的第二个 bool 值（是否读成功）为 true。; 如果 chan 关闭前，buffer 内有元素..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T15:02:55.000Z"}],["meta",{"property":"article:author","content":"码说256"}],["meta",{"property":"article:tag","content":"go"}],["meta",{"property":"article:tag","content":"golang"}],["meta",{"property":"article:tag","content":"map"}],["meta",{"property":"article:tag","content":"interface"}],["meta",{"property":"article:tag","content":"struct"}],["meta",{"property":"article:tag","content":"源码"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"面试总结"}],["meta",{"property":"article:modified_time","content":"2023-07-14T15:02:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"对已经关闭的的chan进行读写，会怎么样？为什么？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T15:02:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"码说256\\",\\"url\\":\\"https://www.ixlymsy.top\\"}]}"]]},"headers":[{"level":2,"title":"题目","slug":"题目","link":"#题目","children":[]},{"level":2,"title":"回答","slug":"回答","link":"#回答","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[{"level":3,"title":"1. 写已经关闭的 chan","slug":"_1-写已经关闭的-chan","link":"#_1-写已经关闭的-chan","children":[]},{"level":3,"title":"2. 读已经关闭的 chan","slug":"_2-读已经关闭的-chan","link":"#_2-读已经关闭的-chan","children":[]}]},{"level":2,"title":"多问一句","slug":"多问一句","link":"#多问一句","children":[{"level":3,"title":"1. 为什么写已经关闭的 chan 就会 panic 呢？","slug":"_1-为什么写已经关闭的-chan-就会-panic-呢","link":"#_1-为什么写已经关闭的-chan-就会-panic-呢","children":[]},{"level":3,"title":"2. 为什么读已关闭的 chan 会一直能读到值？","slug":"_2-为什么读已关闭的-chan-会一直能读到值","link":"#_2-为什么读已关闭的-chan-会一直能读到值","children":[]}]}],"git":{"createdTime":1689346975000,"updatedTime":1689346975000,"contributors":[{"name":"xdc","email":"1549169735@qq.com","commits":1}]},"readingTime":{"minutes":3.38,"words":1015},"filePathRelative":"golang/interview/q018.md","localizedDate":"2023年7月14日","excerpt":"","autoDesc":true}');export{t as data};