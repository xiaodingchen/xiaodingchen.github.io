---
title: Go面试之并发安全的map
order: 4
category:
- golang
tag: [go, golang, map, 并发安全, 源码, 面试, 面试总结]
---
### 并发安全的map
在上一个总结中我们知道map是引用类型的，并且是非线程安全的。这个时候杠精面试官问，我就是要使用Go提供的原生map，你怎么来保证这个map是线程安全的呢？

众所周知Go中有提供线程安全的map，那就是标准包里的`sync.Map`类型。那面试官要使用原生map，那他到底想从你这面获取什么呢？我们来思考这个问题。

怎么保证线程安全的原生map，我们首先想到的是使用互斥锁或读写锁。案例：
```go
type myMap struct {
	l sync.RWMutex
	m map[string]int
}

func NewMyMap() *myMap {
	return &myMap{
		m: make(map[string]int),
	}
}

func (m *myMap) Add(key string, val int) {
	m.l.Lock()
	defer m.l.Unlock()
	m.m[key] = val
}

func (m *myMap) Delete(key string) {
	m.l.Lock()
	defer m.l.Unlock()
	delete(m.m, key)
}

func (m *myMap) Find(key string) (int, bool) {
	m.l.RLock()
	defer m.l.RUnlock()
	val, ok := m.m[key]
	return val, ok
}

func main() {
	wg := sync.WaitGroup{}
	m := NewMyMap()
	for i := 1; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			key := "a"
			m.Add(key, i)
			val, ok := m.Find(key)
			m.Delete(key)
			log.Println(val, ok)
		}(i)
	}
	wg.Wait()
}
```
案例中我们定义了一个结构体，结构体中有两个字段，l代表锁，这里我们选择的是读写锁，m代表的是一个map类型，key是string类型，val是int类型。对于这个结构体我们添加了三个方法，分别是`Add`，`Delete`，`Find`，添加、删除和查找。我们看到在这三个操作中都使用到了锁机制。main函数中我们利用for语句生成了9个goruntine，对同一个map下的key进行并发读写，运行程序正常输出，没有发生panic。说明锁起到了作用。

从上面的案例中我们通过锁机制实现了并发安全的map，那我们还有其他的方式来实现吗？答案是有的，那就是通过channel机制来实现。

#### channel实现并发安全的map

案例:
```go
type myMap struct {
	m  map[string]int
	ch chan func()
}

func NewMyMap() *myMap {
	m := &myMap{
		m:  make(map[string]int),
		ch: make(chan func()),
	}
	go func() {
		for {
			(<-m.ch)()
		}
	}()
	return m
}

func (m *myMap) Add(key string, val int) {
	m.ch <- func() {
		log.Println("add", key, val)
		m.m[key] = val
	}
}

func (m *myMap) Delete(key string) {
	m.ch <- func() {
		delete(m.m, key)
	}
}

func (m *myMap) Find(key string) (int, bool) {
	ch := make(chan int)
	m.ch <- func() {
		val, ok := m.m[key]
		log.Println("find", val, ok)
		if !ok {
			close(ch)
		} else {
			ch <- val
		}
	}
	r, k := <-ch
	return r, k
}

func main() {
	wg := sync.WaitGroup{}
	m := NewMyMap()
	for i := 1; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			key := "a" + strconv.Itoa(i)
			m.Add(key, i)
			val, ok := m.Find(key)
			m.Delete(key)
			log.Println(i, val, ok)
		}(i)
	}
	wg.Wait()
}
```
案例中我们定义了一个结构体，两个字段，ch代表chan，对应的是一个匿名函数，m定义map类型，在对实例初始化的时候，我们开启了一个go协程用来读取ch中的方法并执行。我们同样是通过for循环开了9个协程来对map进行增删改查，但是和上个锁的案例有个不同的地方是多个协程之间不再是对同一个key进行操作，而是对不同的key进行操作。这两者有什么区别呢？如果我们多协程对同一个key进行操作，我们输出的结果和我们预想的将大相径庭。大家可以对代码进行修改试一试。

如果杠精面试官说我就想要多协程对同一个key进行操作，那咋办呢？我个人建议是使用锁进行实现，channel的实现只能保证这个map在并发读写的时候不会panic，但达不到我们预想的要求。

下面是多协程在channel方法下对同一个key进行操作的结果，大家可以参考下。


至于为什么面试官不想用`sync.map`我想大家心中已经有了答案，主要就是考察面试者对锁和channel的知识，至于`sync.map`的相关知识大家可以读这篇文章：














