---
title: docker忽略相关文件
order: 2
category:
- yunwei
  tag: [docker, 源码, 面试, 面试总结]
---
## 发现问题
在`docker build`时发现docker context 随着时间的增长，build越慢，context越大。
这个时候就需要使用.dockerignore文件忽略非必要的上下文。
比如： logs、upload等文件目录
.dockerignore 文件类似于.gitignore文件，格式如下：
```text
logs/
upload/
*.jar
*.zip
bin/
*.log
cache/
runtime
```
将这个文件放到docker项目根目录，用来排除不需要上传到 docker 服务端的文件或目录。

docker 在构建镜像时首先从构建上下文找有没有 .dockerignore 文件，如果有的话则在上传上下文到 docker 服务端时忽略掉 .dockerignore 里面的文件列表。

可以参考这篇文章：https://www.cnblogs.com/panpanwelcome/p/12603658.html
