const e=JSON.parse('{"key":"v-1fa3a2ca","path":"/redis/redis-data-structure.html","title":"Redis中的数据结构","lang":"zh-CN","frontmatter":{"title":"Redis中的数据结构","order":2,"category":["redis"],"tag":["redis","面试","面试总结"],"description":"原文地址 Redis中的数据结构 (https://www.cnblogs.com/neooelric/p/9621736.html) 1. 底层数据结构, 与Redis Value Type之间的关系 对于Redis的使用者来说, Redis作为Key-Value型的内存数据库, 其Value有多种类型. String; Hash; List; Se...","head":[["meta",{"property":"og:url","content":"https://www.ixlymsy.top/redis/redis-data-structure.html"}],["meta",{"property":"og:site_name","content":"个人成长全记录-码说256"}],["meta",{"property":"og:title","content":"Redis中的数据结构"}],["meta",{"property":"og:description","content":"原文地址 Redis中的数据结构 (https://www.cnblogs.com/neooelric/p/9621736.html) 1. 底层数据结构, 与Redis Value Type之间的关系 对于Redis的使用者来说, Redis作为Key-Value型的内存数据库, 其Value有多种类型. String; Hash; List; Se..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T13:51:32.000Z"}],["meta",{"property":"article:author","content":"码说256"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"面试总结"}],["meta",{"property":"article:modified_time","content":"2023-07-14T13:51:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis中的数据结构\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T13:51:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"码说256\\",\\"url\\":\\"https://www.ixlymsy.top\\"}]}"]]},"headers":[{"level":2,"title":"1. 底层数据结构, 与Redis Value Type之间的关系","slug":"_1-底层数据结构-与redis-value-type之间的关系","link":"#_1-底层数据结构-与redis-value-type之间的关系","children":[]},{"level":2,"title":"2. 底层数据结构","slug":"_2-底层数据结构","link":"#_2-底层数据结构","children":[{"level":3,"title":"2.1 SDS - simple dynamic string","slug":"_2-1-sds-simple-dynamic-string","link":"#_2-1-sds-simple-dynamic-string","children":[]},{"level":3,"title":"2.2 list","slug":"_2-2-list","link":"#_2-2-list","children":[]},{"level":3,"title":"2.3 dict","slug":"_2-3-dict","link":"#_2-3-dict","children":[]},{"level":3,"title":"2.4 zskiplist","slug":"_2-4-zskiplist","link":"#_2-4-zskiplist","children":[]},{"level":3,"title":"2.5 intset","slug":"_2-5-intset","link":"#_2-5-intset","children":[]},{"level":3,"title":"2.6 ziplist","slug":"_2-6-ziplist","link":"#_2-6-ziplist","children":[]},{"level":3,"title":"2.7 quicklist","slug":"_2-7-quicklist","link":"#_2-7-quicklist","children":[]},{"level":3,"title":"2.8 zipmap","slug":"_2-8-zipmap","link":"#_2-8-zipmap","children":[]}]}],"git":{"createdTime":1689342692000,"updatedTime":1689342692000,"contributors":[{"name":"xdc","email":"1549169735@qq.com","commits":1}]},"readingTime":{"minutes":38.69,"words":11607},"filePathRelative":"redis/redis-data-structure.md","localizedDate":"2023年7月14日","excerpt":"","autoDesc":true}');export{e as data};