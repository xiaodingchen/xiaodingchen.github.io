---
title: Redis内存分析
order: 6
category:
- redis
tag: [redis, 源码, 面试, 面试总结]
---
## 背景
想知道自己 Redis 实例中数据的内存分布情况。为了不影响线上实例的使用，我们一般会采用 bgsave 生成 dump.rdb 文件，再结合 redis-rdb-tools 和 sqlite 来进行静态分析。总的来说，整个分析的过程简单而实用，是每一个 Redis 的用户都非常值得掌握的一个方法。
## 创建备份
自建 Redis 可在客户端执行 bgsave 生成 rdb 文件。云数据库 Redis 版可以在控制台上可以进行数据备份和下载的操作，下载后的数据为 rdb 格式文件。
## 生成内存快照
redis-rdb-tools 是一个 python 的解析 rdb 文件的工具，在分析内存的时候，我们主要用它生成内存快照。主要有以下三个功能：
* 生成内存快照
* 转储成 json 格式
* 使用标准的 diff 工具比较两个 dump 文件
## redis-rdb-tools 安装
redis-rdb-tools 有两种安装方式，任选其一即可。
### 使用 PYPI 安装
```
pip install rdbtools
```
### 从源码安装
```
git clone https://github.com/sripathikrishnan/redis-rdb-tools
cd redis-rdb-tools
sudo python setup.py install
```
## 使用 redis-rdb-tools 生成内存快照
生成内存快照的命令为：
```
rdb -c memory dump.rdb > memory.csv
```
生成 CSV 格式的内存报告。包含的列有：数据库 ID，数据类型，key，内存使用量(byte)，编码。内存使用量包含 key、value 和其他值。


注意：内存使用量是理论上的近似值，在一般情况下，略低于实际值。memory.csv 例子：
```
$head memory.csv
database,type,key,size_in_bytes,encoding,num_elements,len_largest_element
0,string,"orderAt:377671748",96,string,8,8
0,string,"orderAt:413052773",96,string,8,8
0,sortedset,"Artical:Comments:7386",81740,skiplist,479,41
0,sortedset,"pay:id:18029",2443,ziplist,84,16
0,string,"orderAt:452389458",96,string,8,8
```
## 分析内存快照
SQLite 是一款轻型的数据库。我们可以将前面生成的 csv 导入到数据库中之后，就可以利用 sql 语句很方便的对 Redis 的内存数据进行各种分析了。

注意：SQLite版本必须是3.16.0以上。

### 导入方法
```
sqlite3 memory.db
sqlite> create table memory(database int,type varchar(128),key varchar(128),size_in_bytes int,encoding varchar(128),num_elements int,len_largest_element varchar(128));
sqlite>.mode csv memory
sqlite>.import memory.csv memory
```
数据导入以后，接下来想怎么分析就怎么分析了，举几个简单的例子：

查询key个数
```
sqlite>select count(*) from memory;
```
查询总的内存占用
```
sqlite>select sum(size_in_bytes) from memory;
```
查询内存占用最高的10个 key
```
sqlite>select * from memory order by size_in_bytes desc limit 10;
```
查询成员个数1000个以上的 list
```
sqlite>select * from memory where type='list' and num_elements > 1000;
```
## 总结
通过使用 redis-rdb-tools + sqlite 的方式，可以方便的对 redis 实例的内存情况进行静态的分析。整个过程也比较简单，获取到 rdb 之后即可。
```
rdb -c memory dump.rdb > memory.csv;
sqlite3 memory.db
sqlite> create table memory(database int,type varchar(128),key varchar(128),size_in_bytes int,encoding varchar(128),num_elements int,len_largest_element varchar(128));
sqlite>.mode csv memory
sqlite>.import memory.csv memory
```
一个 List 积攒了10多 GB 的内容，43 MB 以上的 string 类型的 value， 往往不仅能解答问题，而且能够帮助用户排除业务中潜在的风险点，找到业务性能瓶颈。

