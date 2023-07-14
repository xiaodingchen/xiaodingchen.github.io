---
title: Channel的使用
order: 2
category: 
  - golang
tag: [go, channel, 并发]
---
## channel
channel是Golang在语言层面提供的goroutine间的通信方式。channel 是一个通道，用于端到端的数据传输，这有点像我们平常使用的消息队列，只不过 channel 的发送方和接受方是 goroutine 对象，属于内存级别的通信。

这里涉及到了 goroutine 概念，goroutine 是轻量级的协程，有属于自己的栈空间。 我们可以把它理解为线程，只不过 goroutine 的性能开销很小，并且在用户态上实现了属于自己的调度模型。

channel 是引用类型，在多并发操作里是属于协程安全的，并且遵循了 FIFO 特性。即先执行读取的 goroutine 会先获取到数据，先发送数据的 goroutine 会先输入数据。

#### 声明和创建

```go
var ch chan int // 声明一个chan，此时ch是一个nil chan
ch := make(chan int) // 创建一个无缓冲的chan
```
上面的代码我们看到首先声明了一个chan，此时ch是一个nil chan，对nil chan进行send(写、发送)，recv(读、接收)都将会阻塞。

每个channel都有3种操作：send、receive和close
- send：表示sender端的goroutine向channel中投放数据
- receive：表示receiver端的goroutine从channel中读取数据
- close：表示关闭channel
    - 关闭channel后，send操作将导致painc
    - 关闭channel后，若没有缓冲数据，recv操作将返回对应类型的0值以及一个状态码false
    - close并非强制需要使用close(ch)来关闭channel，在某些时候可以自动被关闭
    - 只在sender端上显式使用close()关闭channel。因为关闭通道意味着没有数据再需要发送
    - 如果使用close()，建议条件允许的情况下加上defer

#### channel的两种分类

**channel分为两种：unbuffered channel(无缓冲)和buffered channel（有缓冲）**
```
ch1 := make(chan int) // 无缓冲
ch2 := make(chan int, 10) // 有缓冲
```
**unbuffered channel(无缓冲)：阻塞，同步模式**
- sender端向channel中send一个数据，然后阻塞，直到receiver端将此数据receive
- receiver端一直阻塞，直到sender端向channel发送了一个数据
```go
func main(){
	ch := make(chan int)
	go func(){
		fmt.Println("go send")
		ch<-1
		close(ch)
	}()

	i := <-ch
	fmt.Println("ch val: ", i)
}
```
**buffered channel（有缓冲）：非阻塞，异步模式**
- sender端可以向channel中send多个数据(只要channel容量未满)，容量满之前不会阻塞
- receiver端按照队列的方式(FIFO,先进先出)从buffered channel中按序receive其中数据
```go
func main() {
	ch := make(chan int, 10)
	go func() {
		fmt.Println("go send")
		for i := 0; i < 20; i++ {
			ch <- i
		}
		close(ch)
	}()

	for {
		i, ok := <-ch
		if !ok {
			fmt.Println("ch close")
			return
		}
		fmt.Println("ch val: ", i)
	}
}
```

> unbuffered channel可以认为是容量为0的buffered channel，所以每发送一个数据就被阻塞。注意，不是容量为1的buffered channel，因为容量为1的channel，是在channel中已有一个数据，并发送第二个数据的时候才被阻塞。

**阻塞和不阻塞是由channel控制的，无论是send还是recv操作，都是在向channel发送请求：**
- 对于unbuffered channel，sender发送一个数据，channel暂时不会向sender的请求返回ok消息，而是等到receiver准备接收channel数据了，channel才会向sender和receiver双方发送ok消息。在sender和receiver接收到ok消息之前，两者一直处于阻塞。
- 对于buffered channel，sender每发送一个数据，只要channel容量未满，channel都会向sender的请求直接返回一个ok消息，使得sender不会阻塞，直到channel容量已满，channel不会向sender返回ok，于是sender被阻塞。对于receiver也一样，只要channel非空，receiver每次请求channel时，channel都会向其返回ok消息，直到channel为空，channel不会返回ok消息，receiver被阻塞。
- 在Go的内部行为中，send和recv是一个整体行为，数据未读就表示未send成功。所以对已经关闭的chan进行send操作会引发panic

#### 死锁(deadlock)
当channel的某一端(sender/receiver)期待另一端的(receiver/sender)操作，另一端正好在期待本端的操作时，也就是说两端都因为对方而使得自己当前处于阻塞状态，这时将会出现死锁问题。更通俗地说，**只要所有goroutine都被阻塞，就会出现死锁**。
```go
func main() {
	ch := make(chan int)
	ch <- 1
	fmt.Println("recv")
	<-ch
}
```
在上面的示例中，向unbuffered channel中send数据的操作ch <- 1是在main goroutine中进行的，此channel中recv的操作<-ch也是在main goroutine中进行的。send的时候会直接阻塞main goroutine，使得recv操作无法被执行，go将探测到此问题，并报错：
```go
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:

```
解决方法，只需将send操作放在另一个goroutine中执行即可：
```go
func main() {
	ch := make(chan int)
	go func() {
		fmt.Println("send")
		ch <- 1
	}()
	fmt.Println("recv")
	<-ch
}
```
或者讲无缓冲chan设置为有缓冲chan：
```go
func main() {
	ch := make(chan int, 1)
	fmt.Println("send")
	ch <- 1
	fmt.Println("recv")
	<-ch
}
```

#### 无缓冲同步通信示例
```go
func main() {
	ch := make(chan int)
	defer close(ch)
	wg := sync.WaitGroup{}
	wg.Add(2)
	f1 := func() {
		defer wg.Done()
		time.Sleep(3 * time.Second)
		fmt.Println("f1 end.")
		ch <- 1
	}

	f2 := func() {
		defer wg.Done()
		<-ch
		fmt.Println("f2 end")
	}

	go f1()
	go f2()
	wg.Wait()
}
```
上面的代码表示必须f1函数执行完成才能执行f2函数，否则f2一直阻塞，两个协程之间通过ch进行通信。

#### 有缓冲chan

有缓冲chan一般在进行并发限制的时候用的较多，案例：

```go
type Task struct {
	TaskId int64
	Status string
}

func (t *Task) Do(ch <-chan int) {
	time.Sleep(time.Second * 3)
	t.Status = "Success"
	log.Printf("task %d done.\n", t.TaskId)
	<-ch
}

func main() {
	ch := make(chan int, 10)
	wg := sync.WaitGroup{}
	for i := 1; i < 100; i++ {
		wg.Add(1)
		ch <- i
		go func(i int) {
			defer wg.Done()
			task := &Task{TaskId: int64(i)}
			task.Do(ch)
		}(i)
	}
	wg.Wait()
}
```
案例中我们生成100个任务，每次最多并发执行10个，使用了有缓冲的chan，在任务执行之前对chan进行写操作，任务完成后对chan进行读操作，这样就限制了goruntine的个数。
同时上面的案例中，在task的Do方法中我们使用指向的chan，这个是Go中特有的，表明这个chan参数只能进行读取操作。

- in <-chan int：表示channel in通道只用于接收数据
- out chan<- int：表示channel out通道只用于发送数据

> 只用于接收数据的通道<-chan不可被关闭，因为关闭通道是针对发送数据而言的，表示无数据再需发送。对于recv来说，关闭通道是没有意义的。

案例：
```go
func main() {
	ch := make(chan int, 10)
	go func() {
		for i := 0; i < 100; i++ {
			ch <- i
		}
		close(ch) // 若没有此操作，使用range读取ch将会发生panic，产生死锁
	}()

	for i := range ch {
		fmt.Println("i: ", i)
	}
}
```
前面都是在for无限循环中读取channel中的数据，但也可以使用range来迭代channel，它会返回每次迭代过程中所读取的数据，直到channel被关闭。必须注意，**只要channel未关闭，range迭代channel就会一直被阻塞。**
```go
fatal error: all goroutines are asleep - deadlock!
goroutine 1 [chan receive]:
```
#### select多路监听
很多时候想要同时操作多个channel，比如从ch1、ch2读数据。Go提供了一个select语句块，它像switch一样工作，里面放一些case语句块，用来轮询每个case语句块的send或recv情况。

用法示例：
```go
select{
	case <-ch1:
		// do 
	case v := <-ch2:
		// do
	default:
		// 所有case都不满足条件时，执行default
}
```
defalut语句是可选的，不允许fall through行为，但允许case语句块为空块。select会被return、break关键字中断：return是退出整个函数，break是退出当前select。

select的行为模式主要是对channel是否可读进行轮询，但也可以用来向channel发送数据。它的行为如下：
- 如果所有的case语句块评估时都被阻塞，则阻塞直到某个语句块可以被处理
- 如果多个case同时满足条件，则随机选择一个进行处理，对于这一次的选择，其它的case都不会被阻塞，而是处理完被选中的case后进入下一轮select(如果select在循环中)或者结束select(如果select不在循环中或循环次数结束)
- 如果存在default且其它case都不满足条件，则执行default。所以default必须要可执行而不能阻塞

**所有的case块都是按源代码书写顺序进行评估的。当select未在循环中时，它将只对所有case评估一次，这次结束后就结束select。某次评估过程中如果有满足条件的case，则所有其它case都直接结束评估，并退出此次select。**

> 其实如果注意到select语句是在某一个goroutine中评估的，就不难理解只有所有case都不满足条件时，select所在goroutine才会被阻塞，只要有一个case满足条件，本次select就不会出现阻塞的情况。

需要注意的是，如果在select中执行send操作，则可能会永远被send阻塞。所以，在使用send的时候，应该也使用defalut语句块，保证send不会被阻塞。如果没有default，或者能确保select不阻塞的语句块，则迟早会被send阻塞。

一般来说，select会放在一个无限循环语句中，一直轮询channel的可读事件。

案例：
```go
func main() {
	ch1 := make(chan int)
	ch2 := make(chan int, 10)
	wg := sync.WaitGroup{}
	go func() {
		for {
			select {
			case v, ok := <-ch1:

				if !ok {
					fmt.Println("ch1 close")
					ch1 = nil
				}
				fmt.Println("ch1: ", v)
			case v, ok := <-ch2:
				if !ok {
					fmt.Println("ch2 close")
					ch2 = nil
				}
				fmt.Println("ch2: ", v)

			}
		}
	}()

	for i := 0; i < 10; i++ {
		wg.Add(2)
		go func(i int) {
			defer wg.Done()
			ch2 <- i
		}(i)

		go func(i int) {
			defer wg.Done()
			ch1 <- i
		}(i)

	}
	wg.Wait()
	close(ch1)
	close(ch2)

}
```
执行这段代码，select确实是随机选择case进行执行，同时我们在检测到chan关闭时，对chan进行了nil赋值，这个操作可以让当前case禁用，当select中的case都在禁用状态，select将会结束，达到终止循环的效果


#### 准确使用定时器

在Go中提供了定时器功能，一般都是通过 for-select的方式进行使用，在使用的时候要正确使用，防止内存泄漏

```go
func main() {
	ch := make(chan int, 10)
	go func() {
		i := 0
		for {
			ch <- i
			i++
		}
	}()
	for {
		select {
		case <-time.After(3 * time.Second):
			log.Println("timeout.")
			return
		case v := <-ch:
			log.Println("ch: ", v)
		}
	}
}
```
看上面的案例，我们本意是在3秒之后停止main goruntine，但是我们代码运行下来发现是一直输出数据，并且不会推出main goruntine。原因在于 for+select，再加上 time.After 的组合会导致内存泄露。因为 for在循环时，就会调用都 select 语句，因此在每次进行 select 时，都会重新初始化一个全新的计时器（Timer）。我们这个计时器，是在 3秒后才会被触发去执行某些事，但重点在于计时器激活后，却又发现和 select 之间没有引用关系了，因此很合理的也就被 GC 给清理掉了，因为没有人需要 “我” 了。

要命的还在后头，被抛弃的 time.After 的定时任务还是在时间堆中等待触发，在定时任务未到期之前，是不会被 GC 清除的。这就会导致严重的内存泄漏。改进方法如下：
```go
func main() {
	ch := make(chan int, 10)
	go func() {
		i := 0
		for {
			ch <- i
			i++
		}
	}()
	timer := time.After(3 * time.Second)
	for {
		select {
		case <-timer:
			log.Println("timeout.")
			return
		case v := <-ch:
			log.Println("ch: ", v)
		}
	}
}
```
将延时器放到for循环之外定义，这样每次循环的时候就不会对time.After进行初始化，防止了内存泄漏，同时达到了3秒程序结束的效果.
