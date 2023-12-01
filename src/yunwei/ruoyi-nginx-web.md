---
title: 若依Nginx配置示例
order: 4
category:
- yunwei
  tag: [nginx, 若依]
---

## nginx 配置
```text
server {
    listen       80;
    listen       443 ssl;
    server_name  demo.com;
    # ssl on;
    ssl_certificate      /ssl/demo.com.pem;  # 这里是ssl key文件存放的绝对路径，根据自己的文件名称和路径来写
    ssl_certificate_key  /ssl/demo.com.key;  # 这里是ssl key文件存放的绝对路径，根据自己的文件名称和路径来写
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

    if ($scheme = http) {
        return 301 https://$http_host$request_uri;
    }

    client_max_body_size 2000m; # 上传文件的大小

    keepalive_timeout  120;
    #客户端向服务端发送一个完整的 request header
    client_header_timeout 120;
     #客户端发送服务端发送一个完整的 request bod
    client_body_timeout 120;

    send_timeout 120;
    
    #开启gzip
    gzip  on;  
    #低于1kb的资源不压缩 
    gzip_min_length 1k;
    #压缩级别1-9，越大压缩率越高，同时消耗cpu资源也越多，建议设置在5左右。 
    gzip_comp_level 5; 
    #需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片.
    gzip_types text/plain application/javascript application/x-javascript application/json text/javascript text/xml text/css;  
    #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    gzip_disable "MSIE [1-6]\.";  
    #是否添加“Vary: Accept-Encoding”响应头
    gzip_vary on;
    # 关闭所有代理结果的数据的压缩
    gzip_proxied off;

    location /prod-api/{
        proxy_pass http://ip:port/; # 后端服务代理地址
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }


    location / {
        root /data/wwwroot/fe; # 前端静态文件
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    # 静态目录
    #location /static/ {
    #   alias /data/wwwroot/fe/; # 前端静态文件
    #  error_page 405 =200 $uri;
    #    autoindex off;
    #}

    # 防止爬虫抓取
    if ($http_user_agent ~* "360Spider|JikeSpider|Spider|spider|bot|Bot|2345Explorer|curl|wget|webZIP|qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|NSPlayer|bingbot")
    {
        return 403;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        default_type text/plain;
        return 500 "ERROR";
    }
}

```
