import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-f916d83f.js";const p={},e=t(`<h2 id="构建servemux" tabindex="-1"><a class="header-anchor" href="#构建servemux" aria-hidden="true">#</a> 构建ServeMux</h2><p>net/http包中有默认的DefaultServeMux，gin框架也实现了这个，主要是实现 http.Handler接口，接口只包含一个方法 <code>ServeHTTP(ResponseWriter, *Request)</code></p><p>我们看下gin中怎么实现的</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token comment">// ServeHTTP conforms to the http.Handler interface.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
c <span class="token operator">:=</span> engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span>
c<span class="token punctuation">.</span>writermem<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
c<span class="token punctuation">.</span>Request <span class="token operator">=</span> req
c<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    engine<span class="token punctuation">.</span><span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// 具体的执行请求返回响应的方法</span>

    engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gin框架构建ServeMux流程如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
engine <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 初始化gin，实现了http.Handler接口，是一个合格的ServeMux了</span>
engine<span class="token punctuation">.</span><span class="token function">Use</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 初始化全局中间件</span>
engine<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;/path&quot;</span><span class="token punctuation">,</span> <span class="token function">function</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 添加路由</span>
构建Server
http服务的底层走的是tcp协议，需要监听端口

srv <span class="token operator">:=</span> http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>
Handler<span class="token punctuation">:</span>      engine<span class="token punctuation">,</span> <span class="token comment">// http.Handler接口的实现者</span>
Addr<span class="token punctuation">:</span> <span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 监听http端口</span>
<span class="token punctuation">}</span>

srv<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码监听了8080端口来提供http服务，服务的具体执行者就是我们的gin框架，那么具体是怎么执行一个http请求的呢，具体要看 net/http包中Server.ListenAndServe()的实现，代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>srv <span class="token operator">*</span>Server<span class="token punctuation">)</span> <span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
<span class="token keyword">if</span> srv<span class="token punctuation">.</span><span class="token function">shuttingDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> ErrServerClosed
<span class="token punctuation">}</span>
addr <span class="token operator">:=</span> srv<span class="token punctuation">.</span>Addr
<span class="token keyword">if</span> addr <span class="token operator">==</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
addr <span class="token operator">=</span> <span class="token string">&quot;:http&quot;</span>
<span class="token punctuation">}</span>
ln<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">&quot;tcp&quot;</span><span class="token punctuation">,</span> addr<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> err
<span class="token punctuation">}</span>
<span class="token keyword">return</span> srv<span class="token punctuation">.</span><span class="token function">Serve</span><span class="token punctuation">(</span>ln<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到这个方法两个步骤，tcp协议监听端口，处理监听serve，我们主要看serve，代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>srv <span class="token operator">*</span>Server<span class="token punctuation">)</span> <span class="token function">Serve</span><span class="token punctuation">(</span>l net<span class="token punctuation">.</span>Listener<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
·····
<span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
baseCtx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> srv<span class="token punctuation">.</span>BaseContext <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
baseCtx <span class="token operator">=</span> srv<span class="token punctuation">.</span><span class="token function">BaseContext</span><span class="token punctuation">(</span>origListener<span class="token punctuation">)</span>
<span class="token keyword">if</span> baseCtx <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;BaseContext returned a nil context&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

    <span class="token keyword">var</span> tempDelay time<span class="token punctuation">.</span>Duration <span class="token comment">// how long to sleep on accept failure</span>

    ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>baseCtx<span class="token punctuation">,</span> ServerContextKey<span class="token punctuation">,</span> srv<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        rw<span class="token punctuation">,</span> err <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            ·····
            ·····
            <span class="token keyword">return</span> err
        <span class="token punctuation">}</span>
        connCtx <span class="token operator">:=</span> ctx
        <span class="token keyword">if</span> cc <span class="token operator">:=</span> srv<span class="token punctuation">.</span>ConnContext<span class="token punctuation">;</span> cc <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            connCtx <span class="token operator">=</span> <span class="token function">cc</span><span class="token punctuation">(</span>connCtx<span class="token punctuation">,</span> rw<span class="token punctuation">)</span>
            <span class="token keyword">if</span> connCtx <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;ConnContext returned nil&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        tempDelay <span class="token operator">=</span> <span class="token number">0</span>
        c <span class="token operator">:=</span> srv<span class="token punctuation">.</span><span class="token function">newConn</span><span class="token punctuation">(</span>rw<span class="token punctuation">)</span>
        c<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>rwc<span class="token punctuation">,</span> StateNew<span class="token punctuation">,</span> runHooks<span class="token punctuation">)</span> <span class="token comment">// before Serve can return</span>
        <span class="token keyword">go</span> c<span class="token punctuation">.</span><span class="token function">serve</span><span class="token punctuation">(</span>connCtx<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们通过代码可以看到，监听端口，然后accept阻塞直到返回下一个链接，经过一系列相关处理，创建一个新的连接，然后开一个goruntine处理这个连接，即每次一个http请求都会建立一个连接，每个连接中都会被赋予Server的信息，并通过goruntine来处理这个连接，这个就是go高并发的原理，具体连接的处理在conn.serve中，我们看到这个方法的参数是一个连接的上下文，方法代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>conn<span class="token punctuation">)</span> <span class="token function">serve</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
c<span class="token punctuation">.</span>remoteAddr <span class="token operator">=</span> c<span class="token punctuation">.</span>rwc<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
ctx <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> LocalAddrContextKey<span class="token punctuation">,</span> c<span class="token punctuation">.</span>rwc<span class="token punctuation">.</span><span class="token function">LocalAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> err <span class="token operator">!=</span> ErrAbortHandler <span class="token punctuation">{</span>
<span class="token keyword">const</span> size <span class="token operator">=</span> <span class="token number">64</span> <span class="token operator">&lt;&lt;</span> <span class="token number">10</span>
buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span>
buf <span class="token operator">=</span> buf<span class="token punctuation">[</span><span class="token punctuation">:</span>runtime<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
c<span class="token punctuation">.</span>server<span class="token punctuation">.</span><span class="token function">logf</span><span class="token punctuation">(</span><span class="token string">&quot;http: panic serving %v: %v\\n%s&quot;</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>remoteAddr<span class="token punctuation">,</span> err<span class="token punctuation">,</span> buf<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token operator">!</span>c<span class="token punctuation">.</span><span class="token function">hijacked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
c<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
c<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>rwc<span class="token punctuation">,</span> StateClosed<span class="token punctuation">,</span> runHooks<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token comment">// HTTP/1.x from here on.</span>

    ctx<span class="token punctuation">,</span> cancelCtx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    c<span class="token punctuation">.</span>cancelCtx <span class="token operator">=</span> cancelCtx
    <span class="token keyword">defer</span> <span class="token function">cancelCtx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    c<span class="token punctuation">.</span>r <span class="token operator">=</span> <span class="token operator">&amp;</span>connReader<span class="token punctuation">{</span>conn<span class="token punctuation">:</span> c<span class="token punctuation">}</span>
    c<span class="token punctuation">.</span>bufr <span class="token operator">=</span> <span class="token function">newBufioReader</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>r<span class="token punctuation">)</span>
    c<span class="token punctuation">.</span>bufw <span class="token operator">=</span> <span class="token function">newBufioWriterSize</span><span class="token punctuation">(</span>checkConnErrorWriter<span class="token punctuation">{</span>c<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token operator">&lt;&lt;</span><span class="token number">10</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        w<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">readRequest</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
        <span class="token keyword">if</span> c<span class="token punctuation">.</span>r<span class="token punctuation">.</span>remain <span class="token operator">!=</span> c<span class="token punctuation">.</span>server<span class="token punctuation">.</span><span class="token function">initialReadLimitSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// If we read any bytes off the wire, we&#39;re active.</span>
            c<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>rwc<span class="token punctuation">,</span> StateActive<span class="token punctuation">,</span> runHooks<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span>
            <span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Expect 100 Continue support</span>
        req <span class="token operator">:=</span> w<span class="token punctuation">.</span>req
        <span class="token keyword">if</span> req<span class="token punctuation">.</span><span class="token function">expectsContinue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> req<span class="token punctuation">.</span><span class="token function">ProtoAtLeast</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span>ContentLength <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
                <span class="token comment">// Wrap the Body reader with one that replies on the connection</span>
                req<span class="token punctuation">.</span>Body <span class="token operator">=</span> <span class="token operator">&amp;</span>expectContinueReader<span class="token punctuation">{</span>readCloser<span class="token punctuation">:</span> req<span class="token punctuation">.</span>Body<span class="token punctuation">,</span> resp<span class="token punctuation">:</span> w<span class="token punctuation">}</span>
                w<span class="token punctuation">.</span>canWriteContinue<span class="token punctuation">.</span><span class="token function">setTrue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;Expect&quot;</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token string">&quot;&quot;</span> <span class="token punctuation">{</span>
            w<span class="token punctuation">.</span><span class="token function">sendExpectationFailed</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        c<span class="token punctuation">.</span>curReq<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token function">requestBodyRemains</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Body<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">registerOnHitEOF</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Body<span class="token punctuation">,</span> w<span class="token punctuation">.</span>conn<span class="token punctuation">.</span>r<span class="token punctuation">.</span>startBackgroundRead<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            w<span class="token punctuation">.</span>conn<span class="token punctuation">.</span>r<span class="token punctuation">.</span><span class="token function">startBackgroundRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// HTTP cannot have multiple simultaneous active requests.[*]</span>
        <span class="token comment">// Until the server replies to this request, it can&#39;t read another,</span>
        <span class="token comment">// so we might as well run the handler in this goroutine.</span>
        <span class="token comment">// [*] Not strictly true: HTTP pipelining. We could let them all process</span>
        <span class="token comment">// in parallel even if their responses need to be serialized.</span>
        <span class="token comment">// But we&#39;re not going to implement HTTP pipelining because it</span>
        <span class="token comment">// was never deployed in the wild and the answer is HTTP/2.</span>
        serverHandler<span class="token punctuation">{</span>c<span class="token punctuation">.</span>server<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> w<span class="token punctuation">.</span>req<span class="token punctuation">)</span>
        w<span class="token punctuation">.</span><span class="token function">cancelCtx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> c<span class="token punctuation">.</span><span class="token function">hijacked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        w<span class="token punctuation">.</span><span class="token function">finishRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token operator">...</span><span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span>
        <span class="token operator">...</span><span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span>
        c<span class="token punctuation">.</span>rwc<span class="token punctuation">.</span><span class="token function">SetReadDeadline</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Time<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到这个方法中做了哪些事，方法执行完毕关闭当前连接，读取请求内容，处理并相应。具体处理请求的代码是这个 serverHandler{c.server}.ServeHTTP(w, w.req)我们看到实例化了一个serverHandler并调用了其ServeHTTP方法来处理，我看下这个serverHandler，代码如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token comment">// serverHandler delegates to either the server&#39;s Handler or</span>
<span class="token comment">// DefaultServeMux and also handles &quot;OPTIONS *&quot; requests.</span>
<span class="token keyword">type</span> serverHandler <span class="token keyword">struct</span> <span class="token punctuation">{</span>
srv <span class="token operator">*</span>Server
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>sh serverHandler<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>rw ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
handler <span class="token operator">:=</span> sh<span class="token punctuation">.</span>srv<span class="token punctuation">.</span>Handler
<span class="token keyword">if</span> handler <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
handler <span class="token operator">=</span> DefaultServeMux
<span class="token punctuation">}</span>
<span class="token keyword">if</span> req<span class="token punctuation">.</span>RequestURI <span class="token operator">==</span> <span class="token string">&quot;*&quot;</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span>Method <span class="token operator">==</span> <span class="token string">&quot;OPTIONS&quot;</span> <span class="token punctuation">{</span>
handler <span class="token operator">=</span> globalOptionsHandler<span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
handler<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>rw<span class="token punctuation">,</span> req<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到代码里serverHandler中的 srv即为Server，在serverHandler的ServeHTTP方法中判断Server的Handler是否为nil，如果是nil则使用默认的DefaultServeMux，这里我们的Handler是由gin框架实现的一个ServeMux，调用ServeMux的ServeHTTP方法来处理请求，即交由gin来处理请求。gin中主要通过context.Next()方法来执行具体的gin.HandlerFunc函数，代码如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>
<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> req <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
c <span class="token operator">:=</span> engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>Context<span class="token punctuation">)</span>
c<span class="token punctuation">.</span>writermem<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span>
c<span class="token punctuation">.</span>Request <span class="token operator">=</span> req
c<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    engine<span class="token punctuation">.</span><span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>

    engine<span class="token punctuation">.</span>pool<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>engine <span class="token operator">*</span>Engine<span class="token punctuation">)</span> <span class="token function">handleHTTPRequest</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token operator">...</span><span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

    <span class="token comment">// Find root of the tree for the given HTTP method</span>
    t <span class="token operator">:=</span> engine<span class="token punctuation">.</span>trees
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> tl <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> tl<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>method <span class="token operator">!=</span> httpMethod <span class="token punctuation">{</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        root <span class="token operator">:=</span> t<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>root
        <span class="token comment">// Find route in tree</span>
        value <span class="token operator">:=</span> root<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span>rPath<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Params<span class="token punctuation">,</span> unescape<span class="token punctuation">)</span>
        <span class="token keyword">if</span> value<span class="token punctuation">.</span>handlers <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            c<span class="token punctuation">.</span>handlers <span class="token operator">=</span> value<span class="token punctuation">.</span>handlers
            c<span class="token punctuation">.</span>Params <span class="token operator">=</span> value<span class="token punctuation">.</span>params
            c<span class="token punctuation">.</span>fullPath <span class="token operator">=</span> value<span class="token punctuation">.</span>fullPath
            c<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            c<span class="token punctuation">.</span>writermem<span class="token punctuation">.</span><span class="token function">WriteHeaderNow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
        <span class="token operator">...</span><span class="token operator">...</span>
        <span class="token operator">...</span><span class="token operator">...</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>

    <span class="token operator">...</span><span class="token operator">...</span>
    <span class="token operator">...</span><span class="token operator">...</span>

    c<span class="token punctuation">.</span>handlers <span class="token operator">=</span> engine<span class="token punctuation">.</span>allNoRoute
    <span class="token function">serveError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusNotFound<span class="token punctuation">,</span> default404Body<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
c<span class="token punctuation">.</span>index<span class="token operator">++</span>
<span class="token keyword">for</span> c<span class="token punctuation">.</span>index <span class="token operator">&lt;</span> <span class="token function">int8</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>handlers<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
c<span class="token punctuation">.</span>handlers<span class="token punctuation">[</span>c<span class="token punctuation">.</span>index<span class="token punctuation">]</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token comment">// 执行具体的HandlerFunc</span>
c<span class="token punctuation">.</span>index<span class="token operator">++</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","gin1.html.vue"]]);export{k as default};
