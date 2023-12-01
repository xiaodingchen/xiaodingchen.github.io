---
title: 若依前端配置
order: 1
category:
- yunwei
tag: [nginx, 源码, 面试, 面试总结]
---
## 修改前端代码

### ruoyi-ui/vue.config.js

```javascript

// 二级目录名称admin
publicPath: '/admin/',
```

### ruoyi-ui/src/router/index.js

```javascript
export default new Router({
  mode: 'history', // 去掉url中的#
  base: '/admin/', // 二级目录路径
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
```

## Nginx配置

```markdown
location ^~ /admin/ {
        alias   /wwwroot/demofe/dist/; # 静态文件目录，改成自己的
        index  index.html index.htm;
        try_files $uri $uri/ /index.html =404;
        autoindex  off;
    }

location /prod-api/ {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:8080/;
    proxy_connect_timeout 120;
    # 没有接收数据关闭    等候后端服务器响应时间 这个可以响应的时间
    proxy_read_timeout 120;  # 秒
    # 没有发送数据关闭    后端服务器数据回传时间
    proxy_send_timeout  120;
}
```

