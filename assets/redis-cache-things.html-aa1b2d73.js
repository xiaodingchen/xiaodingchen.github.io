const e=JSON.parse('{"key":"v-100b1fac","path":"/redis/redis-cache-things.html","title":"缓存系统中面临的雪崩/穿透/一致性问题","lang":"zh-CN","frontmatter":{"order":7,"category":["redis"],"tag":["redis","cache","缓存","面试","面试总结"],"description":"缓存系统一定程度上极大提升系统并发能力，但同样也增加额外技术考虑因素，下面针对缓存系统设计与使用中面临的常见问题展开。 缓存应用的典型场景; 缓存雪崩; 缓存穿透; 缓存更新与数据一致性; 缓存应用的典型场景 请求->缓存->命中缓存则返回数据->无缓存则读取原始数据源 缓存定位：前置数据加载，避免数据回源，提供高性能、高并发的数据读取能力；只有未命中...","head":[["meta",{"property":"og:url","content":"https://www.ixlymsy.top/redis/redis-cache-things.html"}],["meta",{"property":"og:site_name","content":"个人成长全记录-码说256"}],["meta",{"property":"og:title","content":"缓存系统中面临的雪崩/穿透/一致性问题"}],["meta",{"property":"og:description","content":"缓存系统一定程度上极大提升系统并发能力，但同样也增加额外技术考虑因素，下面针对缓存系统设计与使用中面临的常见问题展开。 缓存应用的典型场景; 缓存雪崩; 缓存穿透; 缓存更新与数据一致性; 缓存应用的典型场景 请求->缓存->命中缓存则返回数据->无缓存则读取原始数据源 缓存定位：前置数据加载，避免数据回源，提供高性能、高并发的数据读取能力；只有未命中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-15T03:10:30.000Z"}],["meta",{"property":"article:author","content":"码说256"}],["meta",{"property":"article:tag","content":"redis"}],["meta",{"property":"article:tag","content":"cache"}],["meta",{"property":"article:tag","content":"缓存"}],["meta",{"property":"article:tag","content":"面试"}],["meta",{"property":"article:tag","content":"面试总结"}],["meta",{"property":"article:modified_time","content":"2023-07-15T03:10:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"缓存系统中面临的雪崩/穿透/一致性问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-15T03:10:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"码说256\\",\\"url\\":\\"https://www.ixlymsy.top\\"}]}"]]},"headers":[{"level":2,"title":"缓存应用的典型场景","slug":"缓存应用的典型场景","link":"#缓存应用的典型场景","children":[]},{"level":2,"title":"缓存雪崩","slug":"缓存雪崩","link":"#缓存雪崩","children":[{"level":3,"title":"缓存同时失效","slug":"缓存同时失效","link":"#缓存同时失效","children":[]},{"level":3,"title":"缓存系统故障","slug":"缓存系统故障","link":"#缓存系统故障","children":[]}]},{"level":2,"title":"缓存穿透","slug":"缓存穿透","link":"#缓存穿透","children":[]},{"level":2,"title":"缓存更新与数据一致性","slug":"缓存更新与数据一致性","link":"#缓存更新与数据一致性","children":[{"level":3,"title":"几种更新缓存的策略：","slug":"几种更新缓存的策略","link":"#几种更新缓存的策略","children":[]}]}],"git":{"createdTime":1689390630000,"updatedTime":1689390630000,"contributors":[{"name":"xdc","email":"1549169735@qq.com","commits":1}]},"readingTime":{"minutes":7.21,"words":2162},"filePathRelative":"redis/redis-cache-things.md","localizedDate":"2023年7月15日","excerpt":"","autoDesc":true}');export{e as data};