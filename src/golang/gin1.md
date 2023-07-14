---
title: Golang通过Gin框架创建http服务源码剖析
order: 1
category:
  - golang
tag: [go, gin, 源码, 面试, 面试总结]
---
## 构建ServeMux
net/http包中有默认的DefaultServeMux，gin框架也实现了这个，主要是实现 http.Handler接口，接口只包含一个方法 `ServeHTTP(ResponseWriter, *Request)`

我们看下gin中怎么实现的
```go

// ServeHTTP conforms to the http.Handler interface.
func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
c := engine.pool.Get().(*Context)
c.writermem.reset(w)
c.Request = req
c.reset()

    engine.handleHTTPRequest(c) // 具体的执行请求返回响应的方法

    engine.pool.Put(c)
}
```
gin框架构建ServeMux流程如下：
```go

engine := gin.New() // 初始化gin，实现了http.Handler接口，是一个合格的ServeMux了
engine.Use() // 初始化全局中间件
engine.Get("/path", function(ctx *gin.Context){}) // 添加路由
构建Server
http服务的底层走的是tcp协议，需要监听端口

srv := http.Server{
Handler:      engine, // http.Handler接口的实现者
Addr: ":8080", // 监听http端口
}

srv.ListenAndServe()
```
上面的代码监听了8080端口来提供http服务，服务的具体执行者就是我们的gin框架，那么具体是怎么执行一个http请求的呢，具体要看 net/http包中Server.ListenAndServe()的实现，代码如下：

```go
func (srv *Server) ListenAndServe() error {
if srv.shuttingDown() {
return ErrServerClosed
}
addr := srv.Addr
if addr == "" {
addr = ":http"
}
ln, err := net.Listen("tcp", addr)
if err != nil {
return err
}
return srv.Serve(ln)
}
```
我们看到这个方法两个步骤，tcp协议监听端口，处理监听serve，我们主要看serve，代码如下：

```go
func (srv *Server) Serve(l net.Listener) error {
·····
.....
baseCtx := context.Background()
if srv.BaseContext != nil {
baseCtx = srv.BaseContext(origListener)
if baseCtx == nil {
panic("BaseContext returned a nil context")
}
}

    var tempDelay time.Duration // how long to sleep on accept failure

    ctx := context.WithValue(baseCtx, ServerContextKey, srv)
    for {
        rw, err := l.Accept()
        if err != nil {
            ·····
            ·····
            return err
        }
        connCtx := ctx
        if cc := srv.ConnContext; cc != nil {
            connCtx = cc(connCtx, rw)
            if connCtx == nil {
                panic("ConnContext returned nil")
            }
        }
        tempDelay = 0
        c := srv.newConn(rw)
        c.setState(c.rwc, StateNew, runHooks) // before Serve can return
        go c.serve(connCtx)
    }
}
```
我们通过代码可以看到，监听端口，然后accept阻塞直到返回下一个链接，经过一系列相关处理，创建一个新的连接，然后开一个goruntine处理这个连接，即每次一个http请求都会建立一个连接，每个连接中都会被赋予Server的信息，并通过goruntine来处理这个连接，这个就是go高并发的原理，具体连接的处理在conn.serve中，我们看到这个方法的参数是一个连接的上下文，方法代码如下：
```go

func (c *conn) serve(ctx context.Context) {
c.remoteAddr = c.rwc.RemoteAddr().String()
ctx = context.WithValue(ctx, LocalAddrContextKey, c.rwc.LocalAddr())
defer func() {
if err := recover(); err != nil && err != ErrAbortHandler {
const size = 64 << 10
buf := make([]byte, size)
buf = buf[:runtime.Stack(buf, false)]
c.server.logf("http: panic serving %v: %v\n%s", c.remoteAddr, err, buf)
}
if !c.hijacked() {
c.close()
c.setState(c.rwc, StateClosed, runHooks)
}
}()

    ........
    ........

    // HTTP/1.x from here on.

    ctx, cancelCtx := context.WithCancel(ctx)
    c.cancelCtx = cancelCtx
    defer cancelCtx()

    c.r = &connReader{conn: c}
    c.bufr = newBufioReader(c.r)
    c.bufw = newBufioWriterSize(checkConnErrorWriter{c}, 4<<10)

    for {
        w, err := c.readRequest(ctx)
        if c.r.remain != c.server.initialReadLimitSize() {
            // If we read any bytes off the wire, we're active.
            c.setState(c.rwc, StateActive, runHooks)
        }
        if err != nil {
            .......
            .......
            return
        }

        // Expect 100 Continue support
        req := w.req
        if req.expectsContinue() {
            if req.ProtoAtLeast(1, 1) && req.ContentLength != 0 {
                // Wrap the Body reader with one that replies on the connection
                req.Body = &expectContinueReader{readCloser: req.Body, resp: w}
                w.canWriteContinue.setTrue()
            }
        } else if req.Header.get("Expect") != "" {
            w.sendExpectationFailed()
            return
        }

        c.curReq.Store(w)

        if requestBodyRemains(req.Body) {
            registerOnHitEOF(req.Body, w.conn.r.startBackgroundRead)
        } else {
            w.conn.r.startBackgroundRead()
        }

        // HTTP cannot have multiple simultaneous active requests.[*]
        // Until the server replies to this request, it can't read another,
        // so we might as well run the handler in this goroutine.
        // [*] Not strictly true: HTTP pipelining. We could let them all process
        // in parallel even if their responses need to be serialized.
        // But we're not going to implement HTTP pipelining because it
        // was never deployed in the wild and the answer is HTTP/2.
        serverHandler{c.server}.ServeHTTP(w, w.req)
        w.cancelCtx()
        if c.hijacked() {
            return
        }
        w.finishRequest()
        ..........
        ..........
        c.rwc.SetReadDeadline(time.Time{})
    }
}
```
我们看到这个方法中做了哪些事，方法执行完毕关闭当前连接，读取请求内容，处理并相应。具体处理请求的代码是这个 serverHandler{c.server}.ServeHTTP(w, w.req)我们看到实例化了一个serverHandler并调用了其ServeHTTP方法来处理，我看下这个serverHandler，代码如下：
```go

// serverHandler delegates to either the server's Handler or
// DefaultServeMux and also handles "OPTIONS *" requests.
type serverHandler struct {
srv *Server
}

func (sh serverHandler) ServeHTTP(rw ResponseWriter, req *Request) {
handler := sh.srv.Handler
if handler == nil {
handler = DefaultServeMux
}
if req.RequestURI == "*" && req.Method == "OPTIONS" {
handler = globalOptionsHandler{}
}
handler.ServeHTTP(rw, req)
}
```
我们看到代码里serverHandler中的 srv即为Server，在serverHandler的ServeHTTP方法中判断Server的Handler是否为nil，如果是nil则使用默认的DefaultServeMux，这里我们的Handler是由gin框架实现的一个ServeMux，调用ServeMux的ServeHTTP方法来处理请求，即交由gin来处理请求。gin中主要通过context.Next()方法来执行具体的gin.HandlerFunc函数，代码如下

```go

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
c := engine.pool.Get().(*Context)
c.writermem.reset(w)
c.Request = req
c.reset()

    engine.handleHTTPRequest(c)

    engine.pool.Put(c)
}

func (engine *Engine) handleHTTPRequest(c *Context) {
........
........

    // Find root of the tree for the given HTTP method
    t := engine.trees
    for i, tl := 0, len(t); i < tl; i++ {
        if t[i].method != httpMethod {
            continue
        }
        root := t[i].root
        // Find route in tree
        value := root.getValue(rPath, c.Params, unescape)
        if value.handlers != nil {
            c.handlers = value.handlers
            c.Params = value.params
            c.fullPath = value.fullPath
            c.Next()
            c.writermem.WriteHeaderNow()
            return
        }
        ......
        ......
        break
    }

    ......
    ......

    c.handlers = engine.allNoRoute
    serveError(c, http.StatusNotFound, default404Body)
}

func (c *Context) Next() {
c.index++
for c.index < int8(len(c.handlers)) {
c.handlers[c.index](c) // 执行具体的HandlerFunc
c.index++
}
}

```
