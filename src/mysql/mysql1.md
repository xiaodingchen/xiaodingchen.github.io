---
title: MySQL相关知识点浅析
order: 1
category:
- mysql
tag: [mysql, 面试, 面试总结]
---

## Myisam和Innodb的区别

1. innodb支持事务，锁级别是行级锁，支持四个事务隔离级别，分别是未提交读、提交读、可重复读、串行化

2. innodb的索引策略是聚簇索引

3. innodb使用MVCC实现并发控制、也就是多版本并发控制，同时也支持索引间隙锁

4. innodb支持热备份

5. myisam支持全文索引、表压缩

6. myisam的锁不支持行级锁，支持表级锁，这个特性会导致，在并发高的情况下进行读写操作的时候性能很差。

7. myisam支持延迟更新索引键

8. myisam崩溃的概率比innodb要大很多，MySQL的数据恢复相较于innodb较差

9. 数据存储方式不一样，innodb采用聚簇索引的方式存储数据，myisam采用索引和列的值分离的方式存储数据。

- 读锁又被称为共享锁，写锁被称为排它锁。
- ACID指：原子性、一致性、隔离性、持久性

## mysql优化相关
- 慢查询日志，对优化MySQL查询至关重要。可以通过long_query_time参数来设置日志记录行为，当值为0时，记录所有的查询
- 使用show global status SQL语句查看当前连接数(threads_connected)、查询线程数(threads_running)、查询数(queries)
- 使用 show processlist SQL语句查看当前连接线程是否有废线程，比如locked、free 状态的
- 设计表的时候选择合适的数据类型，尽量使用NOT NULL，列不要太多
- 主键最好使用整数类型，避免使用字符串类型
- 查询SQL数据表关联不要过多，一般最多12个表
- 根据实际业务创建相关汇总表和缓存表
- 使用索引。

### mysql修改表相关
- alter table 操作在大多数情况下都会锁表，并且重建整表，慎用

- 对于引擎是myisam的数据表在迁移或转入大量数据的时候，可以先关闭索引，等待数据载入之后开启索引，相关操作如下

#### 关闭索引
```text
alter table table_name disable keys;
```

#### 开启索引
```text
alter table table_name enable keys;
```
> 这个方法对主键、唯一索引无效



## 索引相关

大多数MySQL存储引擎都实现了b-tree索引，b-tree索引是有序的，在order by 和group by语句中也会用到索引

1. 索引总是遵循最左前缀

2. 索引中的列不能被跳过，如果一个查询中有范围查询，那么只能用到范围查询之前的列，右边的用不到。

3. 可以通过伪哈希索引的手段来优化查询语句

4. 查询中的条件的列不能是一个表达式或函数的参数，要是单独的列，这样才能用到索引

5. 索引中列的顺序不同效果也不一样，在实际业务中可以通过使用相同的列不同的顺序来创建更多的索引

6. 索引可以减少服务器扫描的数据量，避免排序和临时表，索引可以将随机I/O变为顺序I/O



### 前缀索引

前缀索引主要是对字符串类型的列取公共前缀进行索引。可以通过不断比较公共前缀出现的次数和总记录的商来取前缀，方法如下：

假设表名为testcity，字符串列名为'city',可以通过如下语句来计算

`select count(distinct left(city,3)) /count(*) as sel from testcity;`

sel的值越接近1越好。

下面添加一个前缀索引

`alter table testcity add key(city(3));`

前缀索引更小，更快，不过在order by 和group by中无法使用。

当使用explain分析查询语句时，如果索引类型为index_merge则说明表的索引策略很糟糕，要优化了

### 多列索引

选择合适的索引顺序至关重要。我们同样可以使用前缀索引中的方法来比较，不过这次我们不是比较前缀出现的次数而是整个列的记录不重复的次数：

表：`testcity` 列：`cityid, xianid`。

`select count(distinct cityid) /count(*) as c, count(distinct xianid) /count(*) as x from testcity;`

计算的结果中值越接近1的就越往前，比如 c>x,那么索引应该这样加

`alter table testcity add key(cityid, xianid);`



如果一个索引包含所有要查询字段的值，那这个索引就被称之为覆盖索引。比如下面这个语句：

`select cityid from testcity where cityid = 10;`

其中 idx_cityid_xianid就是cityid的覆盖索引

`select cityid,id, xianid from testcity where cityid = 10;`这个时候idx_cityid_xianid就不是覆盖索引


聚簇索引是一种数据存储方式，innodb存储引擎支持，主要是通过主键来实现，如果表中没有定义主键，那就会喧杂一个唯一的非空索引替代，如果没有符合条件的，会自行创建一个隐式主键。它将索引和列的值存储在一起。使数据访问更快，但是特消耗存储空间，二级索引访问需要两次查找，而不是一次（首先二级索引先找到主键，然后通过主键找到具体的值，两次索引查找）

在设计innodb主键的时候，建议使用单调顺序自增类型，比如自增ID，因为innodb是顺序插入的。



### myisam和innodb的索引总结。

两者都支持，主键索引、唯一索引、单列、多列索引及前缀索引，不同的是两者实现的存储方式不一样，innodb中使用聚簇索引的方式存储数据，也就是把索引和列的值存在一起，myisam却不同，索引和值分离；：因为myisam的索引和数据是分开存储存储的，myisam通过key_buffer把索引先缓存到内存中，当需要访问数据时（通过索引访问数据），在内存中直接搜索索引，然后通过索引找到磁盘相应数据，这也就是为什么索引不在key buffer命中时，速度慢的原因  ；innodb的数据和索引放在一起，当找到索引也就找到了数据。

### 查询优化相关

- 减少不必要列的查询

- 尽量优化查询，使之可以使用到覆盖索引

- 建立合适的索引，减少查询时扫描的行数

- 拆分复杂的查询，分解关联查询，简单的查询可以减少锁的竞争，易缓存，减少冗余记录查询

- 在select查询中加上limit关键字，可以减少资源占用

- 子查询尽量少用，合理使用子查询，可以使用表连接代替（MySQL版本5.6及以上可以放心大胆的去用子查询）

## MySQL高级特性
### 分区

- range 分区
```sql
CREATE TABLE `request_log` (

`id` int(11) NOT NULL AUTO_INCREMENT,

`ip` int(11) NOT NULL,

`uri` varchar(30) DEFAULT NULL,

`request_time` int(11) NOT NULL,

PRIMARY KEY (`id`,`request_time`),

UNIQUE KEY `ip` (`ip`,`request_time`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8 partition BY RANGE (request_time)

(partition p0 VALUES LESS THAN (1400000000) ENGINE = InnoDB,

partition p1 VALUES LESS THAN (1500000000) ENGINE = InnoDB,

PARTITION pall VALUES LESS THAN MAXVALUE ENGINE = InnoDB);
```


同时还有别的分区，比如，list分区，hash分区，key分区。具体可以参考：https://www.cnblogs.com/mliudong/p/3625522.html 简单了解下



分区的时候最好不要选择默认为NULL的列，选择的列最好有索引（分区列和索引列匹配），分区在查询的时候需要锁住所有的底层表，这会带来很多的开销，要控制合适的分区的个数。分区的维护成本比较高

在进行分区查询的时候，where条件要包含分区列，分区列不能在表达式中，这样可以在查询的时候减少分区的扫描。

比如：`partitions select * from request_log where request_time between 1400000000 and 1500000000;`



### 视图

具体视图相关可以参考：https://blog.csdn.net/moxigandashu/article/details/63254901

全文索引

MySQL5.6版本innodb开始支持全文索引，之前的版本只有myisam支持，具体可以参考：https://www.cnblogs.com/PaulMa/p/5238682.html



### 绑定变量

以二进制的方式向服务端发送参数和句柄，节约内存和网络开销。服务器也只对器进行一次解析。

相对安全，减少了SQL注入和攻击

在高并发的情况下建议关闭查询缓存，如果非要使用的话不要设置太大的内存占用，相关参数：query_cache_type是否开启缓存；query_cache_size查询缓存的总内存空间，单位字节。



### 配置优化：

对于innodb来说最重要的两个配置为：

innodb_buffer_pool_size缓冲池大小

innodb_log_file_size 日志文件大小



基本配置

slow_query_log 慢查询是否开启

long_query_time 慢查询衡量标准，单位秒

max-connections 最大连接数

read-only 是否只读

table_cache_size

sql_mode 服务器模式





### 复制

二进制日志（binlog）建议指定确切路径和文件名，同时在备库上也建议指定中继日志（relay_log）的路径和文件名

相关参数：

主库：

log_bin = /var/lib/mysql/mysql-bin

备库：

relay_log = /var/lib/mysql/relay-bin



复制模式，两种，基于语句(statement)，基于行(row)。

基于语句消耗资源少，执行速度快，但是很多情况下无法正确复制数据。比如有存储过程的语句，语句里有变量的

基于行的复制，顾名思义就是一行一行复制，但是在数据更改比较大的情况下，消耗资源多，复制慢。

一般都是在实际应用中采用混合模式复制(mixed)，即基于行和基于语句一起使用，5.7.7之前默认是基于语句，之后基于行，可以通过参数设置：

binlog_format = mixed|row|statement

参考文章：https://www.cnblogs.com/ivictor/p/5764978.html



主从复制开启步骤

1、在主服务器上创建一个复制账号

2、主库从库配置server_id选项，一般是机器IP32位的后八位，主库配置二进制文件地址，从库配置中继日志文件地址，可以通过show master status 查看binlog日志的名字

3、从库启动复制：

命令： change master to master_host='hostip',master_user='masteruser',master_password='password',master_log_file='binlogname',master_log_pos=0;

master_log_pos设置为0表示从日志开头读起，配置好之后，开始执行命令start slave;



sphinx全文索引



主索引和增量索引都要定时维护。具体相关实现可以参考：bbc，相关知识点，搞清楚文档、属性、关联字段。



相关参考文章：https://blog.csdn.net/soar_away/article/details/52035072

https://blog.csdn.net/adparking/article/details/7080278

手册地址：http://sphinxsearch.com/docs/


