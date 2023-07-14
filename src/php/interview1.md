---
title: PHP面试总结 v20180824
order: 1
category:
 - golang
tag: [php, 面试, 面试总结, php面试总结]
---

今天面试主要和面试官讨论这些问题，我自我感觉回答的很渣。不错，我就是个技术混子，嗯，是的。

## PHP的命令模式实现

PHP的命令模式也就是cli模式，就是把PHP文件当做脚本执行的一种方式。一般最简单的实现就是如下：
```shell
php file.php
```

上面的列子很简单，但是这个问题不是那么简单的。通常我们在web模式下都会有个入口文件，这个入口文件叫 index.php，那么命令模式下是不是也可以有个入口文件呢？答案是可以的，比如ThinkPHP5和yii框架都实现了这个功能。比如：

```shell
php think list
```
上面例子中，think 这个就是命令模式下的入口文件，list 是在换个文件的参数，可以通过 $SERVER['argv'] 获取，获取到参数之后，执行响应的逻辑。一般的框架都会实现命令的注册，每个框架的处理机制不一样，这个可以通过阅读框架的源码看下。

## PHP的错误和异常处理
### 错误处理
一般编程语言都有自己的错误处理机制，这个机制对调试应用程序，处理业务逻辑有很大的帮助。 PHP提供了 error_reporting() 函数来设置错误级别。一般PHP常见的错误级别有这几种：E_ALL, E_ERROR, E_WARNING, E_NOTICE, E_STRICT, E_DEPRECATED。下面是对这几种错误级别的介绍。

- E_ERROR：致命错误，会导致脚本终止运行

- E_WARNING：运行时警告 (非致命错误)。仅给出提示信息，但是脚本不会终止运行

- E_NOTICE：运行时通知。表示脚本遇到可能会表现为错误的情况，但是在可以正常运行的脚本里面也可能会有类似的通知。

- E_STRICT：启用 PHP 对代码的修改建议，以确保代码具有最佳的互操作性和向前兼容性。

- E_DEPRECATED：运行时通知。启用后将会对在未来版本中可能无法正常工作的代码给出警告。（可忽略）

- E_ALL：E_STRICT 除外的所有错误和警告信息。

同时用户也可以设置自身的错误级别，主要通过 `trigger_error()` 函数实现。用户级别的错误有：`E_USER_ERROR, E_USER_WARNING, E_USER_NOTICE, E_USER_DEPRECATED`。

上面的错误级别可以参考PHP官方文档：*http://php.net/manual/zh/errorfunc.constants.php*

有的时候PHP本身对错误的处理难以满足我们的业务需求，这个时候我们可以自定义一个错误处理方法来接管PHP本身的错误处理方式。我们可以通过set_error_handler(callable $error_handler [, int $error_types = E_ALL | E_STRICT ]) 函数来注册这个方法。需要注意的是要记住 error_types 里指定的错误类型都会绕过 PHP 标准错误处理程序， 除非回调函数返回了 FALSE。 error_reporting() 设置将不会起到作用而你的错误处理函数继续会被调用 —— 不过你仍然可以获取 error_reporting 的当前值，并做适当处理。 需要特别注意的是带 @ error-control operator 前缀的语句发生错误时，这个值会是 0。 以下级别的错误不能由用户定义的函数来处理： E_ERROR、 E_PARSE、 E_CORE_ERROR、 E_CORE_WARNING、 E_COMPILE_ERROR、 E_COMPILE_WARNING，和在 调用 set_error_handler() 函数所在文件中产生的大多数 E_STRICT。可在 register_shutdown_function() 中处理( 但脚本仍会结束 )

`error_get_last()`获取最后发生的错误，返回了一个关联数组，描述了最后错误的信息，以该错误的 “type”、 “message”、”file” 和 “line” 为数组的键。 如果该错误由 PHP 内置函数导致的，”message”会以该函数名开头。 如果还没有错误则返回 NULL。

```php
Array
(
    [type] => 8
    [message] => Undefined variable: a
    [file] => C:\WWW\index.php
    [line] => 2
)
```
一般在做错误处理的时候这个函数会被`register_shutdown_function()`注册到脚本运行结束前。

具体使用方法可以参考PHP官方手册：*http://php.net/manual/zh/function.set-error-handler.php*

异常处理
在PHP中采用 `try...catch` 模式来处理异常，使用 throw关键字抛出异常。PHP的异常处理基类是 Exception，所有的异常处理类都继承它。官方手册地址：http://php.net/manual/zh/class.exception.php

同时PHP也提供了 ErrorException 错误异常处理类，可以使用set_error_handler()函数将错误信息托管至ErrorException：

```php
<?php
function exception_error_handler($errno, $errstr, $errfile, $errline ) {
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
}
set_error_handler("exception_error_handler");

/* Trigger exception */
strpos();
?>
```
具体可参考PHP官方手册：*http://php.net/manual/zh/class.errorexception.php*

除了上述两个标准异常之外，SPL提供了一系列标准异常。具体可参考：*http://php.net/manual/zh/spl.exceptions.php*

PHP官方提供了 `set_exception_handler()` 函数来帮助开发者自定义异常处理行为。手册地址：http://php.net/manual/zh/function.set-exception-handler.php

错误和异常统一处理
一般在框架中都会封装一套属于框架自身的错误和异常处理模块，通常错误会被转化为异常进行统一处理。以下是简单的实现思路
```php
<?php

class handleExceptions
{
    public function init()
    {
        // 致命错误和语法错误
        error_reporting(E_ERROR | E_USER_ERROR | E_PARSE | E_COMPILE_ERROR);
        
        set_error_handler([$this, 'errorHandler']);
        
        set_exception_handler([$this, 'exceptionHandler']);
        // 获取最后一次错误
        register_shutdown_function([$this, 'handlerShutdown']);
    }

    public function errorHandler($level, $message, $file = '', $line = 0, $context = array())
    {
        // 判断错误级别是否是设置的
        if (error_reporting() & $level)
        {
            throw new \ErrorException($message, 0, $level, $file, $line);
        }
    }

    public function exceptionHandler(Exception $e)
    {
        // 所有的错误和异常都在这里进行处理,一般处理错误的时候需要进行以下几点
        // 1、根据错误级别记录错误日志，有利于后期排查
        // 2、根据当前业务场景做出相应的动作，比如在开发模式下，就把错误全面的展现出来，如果是生产模式下就要进行优雅的错误处理。
    }

    public function handlerShutdown()
    {
        $error = error_get_last();
        if ( ! is_null($error) && $this->isFatal($error['type']))
        {
            $this->exceptionHandler($this->fatalExceptionFromError($error, 0));
        }
    }

    protected function fatalExceptionFromError(array $error, $traceOffset = null)
    {
    	return new \ErrorException(
            $error['message'], 0, $error['type'], $error['file'], $error['line']
        );
    }

    protected function isFatal($type)
    {
        $a = in_array($type, [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE]);
        
        return $a;
    }
}

```
上面的例子中，我们自定义了一个处理类，这个类只对致命性错误和语法错误进行防范处理，其他的错误进行了忽略。（可重写errorHandler方法，让其对其他级别的错误进行处理）handleExceptions::exceptionHandler()方法让错误和异常都在这里进行处理。 一般处理错误的时候需要进行：

1、根据错误级别记录错误日志，有利于后期排查

2、根据当前业务场景做出相应的动作，比如在开发模式下，就把错误全面的展现出来，如果是生产模式下就要进行优雅的错误处理。（比如错误页面啊，Ajax模式下错误响应，错误恢复脚本继续执行等等）

在PHP7以上，E_ERROR的错误可以交由`set_exception_handler`，即自定义异常来捕获。具体参考：http://php.net/manual/en/class.error.php 和 http://php.net/manual/en/class.throwable.php 及 http://php.net/manual/zh/function.set-exception-handler.php

## 会话管理，跨域，单点登录
### 会话管理
在web开发中，总是会用到会话管理。所谓会话管理指的是因为HTTP协议是无状态的一种协议，为了识别当前用户而创建的一种技术手段。会话管理主要有两个部分组成，客户端和服务器端。一般客户端指的是COOKIE，服务器端指的是SESSION。

`Session`和`cookie`的关系。会话是由客户端发起请求，服务器端响应。比如用户登录，用户发起登录请求，服务器校验请求是否正确，正确的话就在服务器端生成一个唯一sessionID，然后通过HTTP协议把这个sessionID放到cookie里返回给客户端，客户端收到cookie后会在每次请求的时候带上cookie。格式如下：

Cookie: PHPSESSID=q0fm8up72q58ne1b6khf37dlos

PHP提供了很简单两个全局变量来操作`cookie`和`session`，分别是 `$_COOKIE` 和 `$_SESSION`，开发者不需要考虑sessionID的问题。PHP默认会把session存储在服务器的临时目录中，并在每次运行时进行GC操作。你可以通过配置 php.ini 文件改变它。同时你也可以通过自定义会话管理器来管理会话。自定义会话管理可以实现共享session。下面是利用 Redis 来实现 session 的存储的例子。
```phpregexp

class sysSession implements SessionHandlerInterface
{
    private $client;
    private $exprie;
    
    public function __construct($client)
    {
        $this->client = $client;
    }

    public function setExprie($exprie)
    {
        $this->exprie = $exprie;
    }

    public function open($savePath, $sessionName)
    {
        return true;
    }

    public function close()
    {
        return true;
    }

    public function read($id)
    {
        return $this->client->get($id);
    }

    public function write($id, $data)
    {
        return $this->client->setsetEx($id, $this->exprie, $data);
    }

    public function destroy($id)
    {
        return $this->client->delete($id);
    }

    public function gc($lifetime)
    {
        return true;
    }
}

```
使用示例：
```phpregexp

$redis = new Redis;
$redis->open("ip", "port", "timeout");
$handler = new sysSession($redis);
$handler->setExprie(3600);
session_set_save_handler($handler, true);
register_shutdown_function('session_write_close');
session_start();
```
你可以把session存储到一个公共的服务器或集群中，这样就可以实现共享session了

关于session相关知识可以阅读PHP官方手册：http://php.net/manual/zh/session.examples.php 
会话安全方面PHP官方手册进行了说明，地址：http://php.net/manual/zh/session.security.php 和 http://php.net/manual/zh/features.session.security.management.php

### 会话跨域和单点登录

有的时候我们一个网站有很多服务模块，每个模块都有一个域名，这个时候我们想实现多个域名之间的会话管理，那应该怎么办呢？首先我们要知道跨域，浏览器有一种同源策略。比如： a.domin.com 不能访问 b.explame.com 下的cookie，因为他们不同源，如果是这两个域名 a.domain.com 和 b.domain.com 呢？这两个是同源域名，都属于 domain.com，看下列代码：

```php
<?php
    setcookie("TestCookie", "", time() - 3600, "/", "domain.com", false, true);
```
在PHP中通过上述代码就可以让a.domain.com 和 b.domain.com进行cookie之间的相互传递，然后在每次请求的时候把cookie相关信息带上，服务端实现session共享，就可以实现会话的跨域了。这个解决方案是解决了主域名和子域名下的会话管理问题，如果是多个不同的域名呢，应该怎么办？这个时候我们就要考虑到单点登录了

关于单点登录，可以参考这篇文章：*https://www.cnblogs.com/ywlaker/p/6113927.html* 
一般单点登录的使用场景是多系统之间。比如淘宝和天猫。淘宝和天猫是两种不同的系统，域名也不一样，但是你在淘宝上登录之后在天猫上也可以访问自己的个人中心。（所有的一切都是基于统一浏览器上）

同样PHP有个比较好的项目叫做 UCenter，这个产品很好的实现了单点登录，可以自己动手实现下。

## 负载均衡
当业务发展到一定程度之后，单台服务器就无法满足业务需求，这个时候就要考虑到使用集群方案。负载均衡是集群方案中的一种策略。负载均衡的主要作用就是根据不同的算法分发请求至服务集群中的某个节点。在PHP web开发中主要使用 Nginx或者 Apache 来做负载均衡执行者。在 Nginx 中主要采用反向代理的方式来实现负载均衡。Nginx默认采用轮询算法。同时还用 IP_hash 算法。Nginx 默认提供这两种算法，同时也支持第三方的算法。下面是这些算法的介绍。

1. 轮询算法(默认)

每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。

```text
upstream backserver { 
server 192.168.0.14; 
server 192.168.0.15; 
} 
```
同时也可以指定权重，指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。

```text
upstream backserver { 
server 192.168.0.14 weight=10; 
server 192.168.0.15 weight=10; 
} 
```
2. IP绑定 ip_hash

每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。

```text
upstream backserver { 
ip_hash; 
server 192.168.0.14:88; 
server 192.168.0.15:80; 
} 
```
当ip hash失效时，会退化为轮询策略，因此不会有丢失流量的情况。从这个层面上说，ip hash也可以看成是轮询的升级版。

3. fair（第三方）

按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```text
upstream backserver { 
server server1; 
server server2; 
fair; 
} 
```
4. url_hash（第三方）

按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。

```text
upstream backserver { 
server squid1:3128; 
server squid2:3128; 
hash $request_uri; 
hash_method crc32; 
} 
```
关于Nginx负责均衡算法策略的选择，要根据业务场景来选择,一般选择的标准可以参考这三个指标：
- 均衡性：是否能够将请求均匀的发送给后端
- 一致性：同一个key的请求，是否能落到同一台机器
- 容灾性：当部分后端机器挂掉时，是否能够正常工作
可以参考这篇文章：https://www.cnblogs.com/wpjamer/articles/6443332.html

负载均衡相关知识可参考：https://blog.csdn.net/qq_27093465/article/details/78273656
关于Nginx轮询算法的解释可以看这篇文章：https://blog.csdn.net/itkingone/article/details/80365212

## 秒杀活动和超卖
一般做程序开发都会遇到这种业务需求：秒杀活动。比如双十一的商品秒杀，某游戏的内测号等等。一般面试的时候问这个问题主要是考察候选人的综合能力。

### 秒杀设计
首先考虑秒杀的场景，秒杀是指在指定时间范围内有限库存限制下的售卖行为。在时间范围内，随着请求的增加怎么保持服务的快速响应，怎么限制用户的下单行为，商品库存的增减等等都是要考虑的。我们一一分析下。

1. 高并发下的秒杀活动页面快速响应
- 从前端来讲可以这样搞：

- - 页面静态化：像秒杀活动页面一般都是访问比较高的，商品信息和库存都是固定的。所以把页面进行静态化处理是一种很好的方法，同时可以使用JS异步请求服务端，做一些简单的逻辑处理。比如倒计时、购买按钮禁止，库存修改、禁止重复提交和无限刷新等。

- - CDN加速：静态资源可以使用CDN加速。

- - 用户限流：在某一时间段内只允许用户提交一次请求，比如可以采取IP限流

- 后端的角度可以这样搞：

- -在前端和后端服务之间增加一个中间层。一般这个中间层就是我们上文提到的负载均衡，通过负载均衡把请求分发到不同的节点。

- -限制同一UserID访问频率：尽量拦截浏览器请求，在服务端控制层需要针对同一个访问uid，限制访问频率。

- -业务分离:将秒杀业务系统和其他业务分离，单独放在专门用来做秒杀活动的服务器集群上。

- -采用消息队列缓存请求：将大流量请求写到消息队列缓存，利用服务器根据自己的处理能力主动到消息缓存队列中抓取任务处理请求

- -利用缓存应对读请求：对于读多写少业务，大部分请求是查询请求，所以可以读写分离，利用缓存分担数据库压力

- -利用缓存应对写请求：缓存也是可以应对写请求的，可把数据库中的库存数据转移到Redis缓存中，所有减库存操作都在Redis中进行，然后再通过后台进程把Redis中的用户秒杀请求同步到数据库中。

- -随机选取用户执行秒杀逻辑，没有选取到的用户返回秒杀失败

我们在创建秒杀活动的时候就要把商品相关信息写入到缓存中，比如商品实际库存、秒杀限制库存，商品相关信息等。

我们可以采用Redis 最简单的key-value数据结构，用一个原子类型的变量值(AtomicInteger)作为key，把用户id作为value，库存数量便是原子变量的最大值。对于每个用户的秒杀，我们使用 RPUSH key value插入秒杀请求， 当插入的秒杀请求数达到上限时，停止所有后续插入。下面是简单样例：

```php
// 假设商品库存有10个,key键名为 goods.store
$nums = $redis->get('goods.store');
if($nums<=0){
    return false;
}

if ($redis->decr('goods.store')<0){
    return false;
}

$redis->rpush('sale:1', 'uid')
```
上面的示例中，我们定义了几个key，分别是：goods.store(商品库存)、sale:1(秒杀队列的key)，开始的时候我们判断商品库存是否小于等于0，成立的话就说明秒杀失败，不成立的话就对商品库存进行 decr 操作并判断是否小于0，成立说明秒杀失败，不成立的话就把秒杀用户ID加入到秒杀队列中，然后去消费秒杀队列，用户在对订单付完款之后减商品数据库库存，然后把用户ID加入到秒杀购买成功队列,如果订单在一定时间内不付款就把此订单状态改为失败然后redis里的 goods.store进行 incr 操作。

### 超卖问题
关于超卖问题，一般都是在并发下，对库存的判断出现了问题，上个例子中已经采用了原子操作，可以极大可能的避免超卖，但是会导致少卖，同时也可以使用redis的乐观锁和事务实现：

```php
$redis->watch(key)
if(redis->get(key) < 0){
    echo '抢购失败';return false;
}
$redis->multi();
$redis->decr(key);
$redis->rpush();
$redis-exec();
```
