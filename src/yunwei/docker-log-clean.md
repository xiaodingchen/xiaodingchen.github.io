---
title: docker清理日志
order: 3
category:
- yunwei
tag: [docker, 源码, 面试, 面试总结]
---

## 查询docker容器日志
```shell
echo "======== docker containers logs file size ========"
 
logs=$(find /var/lib/docker/containers/ -name *-json.log)
 
for log in $logs
	  do
		ls -lh $log
done

```

## 清除docker容器日志
```shell
#!/bin/bash
echo "======== start clean docker containers logs ========"
logs=$(find /var/lib/docker/containers/ -name *-json.log)
for log in $logs
	do
      echo "clean logs : $log"
      cat /dev/null > $log
done
echo "======== end clean docker containers logs ========"
```
