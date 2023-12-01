---
title: 文本超出宽度省略号
order: 1
category:
- fe
tag: [前端, 源码, css, 面试总结]
---
## 单行文本省略号
```css
div{
    width:400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

## 多行文本省略号
```css
div{
    width: 400px;
    border-radius: 1px solid red;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
```
