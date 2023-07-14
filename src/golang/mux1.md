---
title: Go面试之sync.Mutex和sync.RWMutex
order: 6
category:
- golang
tag: [go, golang, mutex, 并发安全, 源码, 面试, 面试总结]
---

在上一个总结中我们在实现线程安全的map的时候用到了锁的概念，面试官听到这个锁的实现方法之后双眼冒光，开始了新一轮的攻势。问：互斥锁和读写锁有啥区别？

### sync.Mutex互斥锁
Go中标准包提供sync.Mutex类型实现mutex(排他锁、互斥锁)。定义：
```go
// A Mutex is a mutual exclusion lock.
// The zero value for a Mutex is an unlocked mutex.
//
// A Mutex must not be copied after first use.
type Mutex struct {
	state int32
	sema uint32
}
```
sync.Mutex提供两个方法，Lock()方法获取锁，UnLock()释放锁。一旦被锁住，其他的Lock操作将无法进行，直到其被UnLock。在goruntine中已有的锁在没有被释放前去获取锁，那么这个gorutine将会被阻塞，只有在UnLock后才会解除阻塞。案例：

```go
var i int
var m sync.Mutex

func add() {
	m.Lock()
	defer m.Unlock()
	i++
}

func read() int {
	m.Lock()
	defer m.Unlock()
	return i
}

func noLockRead() int {
	return i
}

func main() {
	var wg sync.WaitGroup
	for j := 0; j < 10; j++ {
		wg.Add(1)
		go func(j int) {
			defer wg.Done()
			add()
			log.Println("nolock", j, noLockRead())
			log.Println(j, read())
		}(j)
	}
	wg.Wait()
}
```
我们看到在代码案例中我们对共享的变量i进行加和读操作，add方法中使用了互斥锁，记住：**在Lock()和Unlock()之间的代码段称为资源的临界区(critical section)，在这一区间内的代码是严格被Lock()保护的，是线程安全的，任何一个时间点都只能有一个goroutine执行这段区间的代码。**由于add和read操作都会使用到锁，所以20个goruntine将会产生40个资源临界区，Lock保证了在一个时间点只有其中一个goruntine可以访问其中一个临界区，当释放了释放了一个临界区，其他的Lock将会竞争互斥锁，这个叫做锁竞争。因为竞争的存在，这40个临界区是随机被访问的，所以是无序的，总结下来就是：**Mutex保证了每个资源临界区的安全，某一时间点只有一个goroutine访问到这部分，但也因此而出现了随机性。**

在Go中允许这样：如果在一个地方Lock()，在另一个地方不Lock()而是直接修改或访问共享数据，这对于sync.Mutex类型来说是允许的，因为mutex不会和goroutine进行关联。

> 根据上述的结论，在上个总结的线程安全的map一文中是有一处错误的，那就是使用锁机制实现的线程安全的map，也是无法保证操作顺序的，只能保证map是线程安全的。

### sync.RWMutex读写锁

看下这个结构的定义：
```go
type RWMutex struct {
	w           Mutex  // held if there are pending writers
	writerSem   uint32 // 写锁需要等待读锁释放的信号量
	readerSem   uint32 // 读锁需要等待写锁释放的信号量
	readerCount int32  // 表示当前启用的读者数量，包括了所有正在临界区里面的读者或者被写锁阻塞的等待进入临界区读者的数量。相当于是当前调用了 RLock 函数并且还没调用 RUnLock 函数的读者的数量。
	readerWait  int32  // 用来记录在获取写锁之前，需要等待多少读锁释放的数量。
}
```
从上面的代码我们可以看出：
1. Go中的读写锁是基于互斥锁的
2. 读写锁允许有多个读锁和一个写锁
    - 可以同时申请多个读锁
    - 有写锁时，申请读锁和写锁将会阻塞
    - 读写锁常被用于读多写少的场景

`func (rw *RWMutex) Lock()`　写锁，如果在添加写锁之前已经有其他的读锁和写锁，则lock就会阻塞直到该锁可用，为确保该锁最终可用，已阻塞的 Lock 调用会从获得的锁中排除新的读取器，即写锁权限高于读锁，有写锁时优先进行写锁定。

`func (rw *RWMutex) Unlock()` 写锁解锁，如果没有进行写锁定，则就会引起一个运行时错误

`func (rw *RWMutex) RLock()` 读锁，当有写锁时，无法加载读锁，当只有读锁或者没有锁时，可以加载读锁，读锁可以加载多个，所以适用于＂读多写少＂的场景

`func (rw *RWMutex)RUnlock()` 读锁解锁，RUnlock 撤销单次 RLock 调用，一次RUnlock()操作只是对读锁数量减1，即减少一次读锁的引用计数，如果没有进行写锁定，则就会引起一个运行时错误

案例：
```go
package main

import (
	"log"
	"sync"
)

type myMap struct {
	rw   sync.RWMutex
	m    sync.Mutex
	data map[string]int
}

func (m *myMap) add(key string, val int) {
	m.rw.Lock()
	log.Println("add", key, val)
	//time.Sleep(time.Second * 3)
	defer m.rw.Unlock()
	m.data[key] = val
}

func (m *myMap) mFind(key string) int {
	m.m.Lock()
	log.Println("mfind", key)
	//time.Sleep(time.Second)
	defer m.m.Unlock()
	return m.data[key]
}

func (m *myMap) rwFind(key string) int {
	m.rw.RLock()
	log.Println("rwfind", key)
	//time.Sleep(time.Second)
	defer m.rw.RUnlock()
	return m.data[key]
}

func main() {
	wg := sync.WaitGroup{}
	m := &myMap{data: make(map[string]int)}
	key := "a"
	for i := 0; i < 5; i++ {
		wg.Add(3)
		go func(i int) {
			defer wg.Done()
			m.add(key, i)

		}(i)

		go func(i int) {
			defer wg.Done()
			log.Println("mfor", i, m.mFind(key))
		}(i)

		go func(i int) {
			defer wg.Done()
			log.Println("rwfor", i, m.rwFind(key))
		}(i)
	}

	wg.Wait()
}

```
上述代码中我们定义了一个结构体，里面的属性一个是互斥锁，一个是读写锁，还有个map结构。mFind方法通过互斥锁去读map数据，rwFind方法通过读写锁去读取数据。当使用mFind读取数据时，我们发现读数据和写数据互不冲突，读和读却是冲突的，因为是互斥锁。使用rwFind读取数据，虽然读锁不冲突，因为读写锁可以多次获取读锁，但是若一个写锁在占用锁，那多个读锁就都会阻塞，要等待写锁完成释放后，读锁才会继续执行。

### sync.Mutex和sync.RWMutex如何选择
Mutex和RWMutex都不关联goroutine，它们的锁申请行为可以在一个goroutine中操作，释放锁行为可以在另一个goroutine中操作。但RWMutex显然更适用于读多写少的场景。仅针对读的性能来说，RWMutex要高于Mutex，因为rwmutex的多个读可以并存。


















