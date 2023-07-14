const e=JSON.parse('{"key":"v-b511c03c","path":"/mysql/mysql3.html","title":"MySQL笔记之实践篇","lang":"zh-CN","frontmatter":{"title":"MySQL笔记之实践篇","order":3,"category":["mysql"],"tag":["mysql","面试","面试总结"],"description":"唯一索引和普通索引的选择 1. 主要从更新性能考虑 2. 同一个字段，唯一索引和普通索引的查询消耗的性能对MySQL来说是相差不大的，普通索引比唯一索引多一次操作 3. 数据插入时针对于这两个索引，Innodb存储引擎处理的逻辑是不一样的 唯一索引：判断有没有冲突，插入值，语句更新结束，如果插入的记录所在页不在内存中，还要多一步：将数据页读到内存。; ...","head":[["meta",{"property":"og:url","content":"https://www.ixlymsy.top/mysql/mysql3.html"}],["meta",{"property":"og:site_name","content":"个人成长全记录-码说256"}],["meta",{"property":"og:title","content":"MySQL笔记之实践篇"}],["meta",{"property":"og:description","content":"唯一索引和普通索引的选择 1. 主要从更新性能考虑 2. 同一个字段，唯一索引和普通索引的查询消耗的性能对MySQL来说是相差不大的，普通索引比唯一索引多一次操作 3. 数据插入时针对于这两个索引，Innodb存储引擎处理的逻辑是不一样的 唯一索引：判断有没有冲突，插入值，语句更新结束，如果插入的记录所在页不在内存中，还要多一步：将数据页读到内存。; ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-14T13:51:32.000Z"}],["meta",{"property":"article:author","content":"码说256"}],["meta",{"property":"article:tag","content":"mysql"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"面试总结"}],["meta",{"property":"article:modified_time","content":"2023-07-14T13:51:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL笔记之实践篇\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-14T13:51:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"码说256\\",\\"url\\":\\"https://www.ixlymsy.top\\"}]}"]]},"headers":[{"level":2,"title":"唯一索引和普通索引的选择","slug":"唯一索引和普通索引的选择","link":"#唯一索引和普通索引的选择","children":[]},{"level":2,"title":"change buffer 和 redo log","slug":"change-buffer-和-redo-log","link":"#change-buffer-和-redo-log","children":[]},{"level":2,"title":"MySQL为何有的时候选择的索引不是理想中的，如何避免","slug":"mysql为何有的时候选择的索引不是理想中的-如何避免","link":"#mysql为何有的时候选择的索引不是理想中的-如何避免","children":[]},{"level":2,"title":"字符串类型的字段如何加索引","slug":"字符串类型的字段如何加索引","link":"#字符串类型的字段如何加索引","children":[]},{"level":2,"title":"MySQL在fsync操作时执行查询或更新语句很慢","slug":"mysql在fsync操作时执行查询或更新语句很慢","link":"#mysql在fsync操作时执行查询或更新语句很慢","children":[]},{"level":2,"title":"数据删除问题","slug":"数据删除问题","link":"#数据删除问题","children":[]},{"level":2,"title":"count(*)","slug":"count","link":"#count","children":[]}],"git":{"createdTime":1689342692000,"updatedTime":1689342692000,"contributors":[{"name":"xdc","email":"1549169735@qq.com","commits":1}]},"readingTime":{"minutes":4.89,"words":1467},"filePathRelative":"mysql/mysql3.md","localizedDate":"2023年7月14日","excerpt":"","autoDesc":true}');export{e as data};
