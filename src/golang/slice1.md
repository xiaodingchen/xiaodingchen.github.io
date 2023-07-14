---
title: MySQL相关知识点浅析
order: 2
category:
- golang
tag: [go, golang, slice, 面试, 面试总结, 源码]
---
## 切片
切片是Golang中特有的数据类型。在Go语言中数组是固定长度的，不能动态扩容的，在编译器会固定大小。而切片是对数组的抽象，是一种灵活地"动态数组"，切片可以追加元素。切片是一种数据结构，切片不是数组，切片描述的是一块数据。切片声明如下：

```go
var ints []int // 直接声明
ints := []int{1, 2, 3, 4} // 字面量声明
ints := make([]int{}, 2, 4) // make创建
ints := arr[1:5] // 下表截取创建
ints := *new([]int) // new一个
```
其中最常用的是make创建和下标截取。切片可以通过Go内置append方法进行追加元素，当cap不够时进行动态扩容。一般cap是切片长度的两倍。切片是引用类型。

切片的内置结构：

```go
type SliceHeader struct {
Data uintptr // 表示该slice结构从底层数组的哪一个元素开始，该指针指向该元素
Len  int // 表示slice当前的长度，如果追加元素，长度不够时会扩展，最大扩展到Capacity的长度
Cap  int // 即底层数组的长度，表示这个slice目前最多能扩展到这么长
}
```
切片的Data属性是指向切片数组的指针，这个概念很重要。若切片发生拷贝，其实质是对当前三个属性的拷贝，不管当前slice具体有多少个元素，其拷贝时间都是大差不差的。

切片的扩容
切片在扩容时会进行内存对齐，这个和内存分配策略相关。进行内存对齐之后，新 slice 的容量是要 大于等于老 slice 容量的 2倍或者1.25倍，当原 slice 容量小于 1024 的时候，新 slice 容量变成原来的 2 倍；原 slice 容量超过 1024，新 slice 容量变成原来的1.25倍。

我们来关注下面的代码：

```go
func main() {
    ints := make([]int, 2, 4)
    fmt.Println(ints) // [0 0]
    int1 := ints[1:]
    fmt.Println(int1, cap(int1)) // [0] 3
    int1[0] = 1
    fmt.Println(ints) // [0 1]
    int1 = append(int1, 2)
    fmt.Println(int1, cap(int1)) // [1 2] 3
    fmt.Println(ints) // [0 1]
    int1[0] = 2
    fmt.Println(ints, int1, cap(int1)) // [0 2] [2 2] 3
    ints = append(ints, 3)
    fmt.Println(ints, int1, cap(int1)) // [0 2 3] [2 3] 3
}
```
首先我们声明了一个长度为2，cap为4的int类型切片，这是个零切片。接着我们通过下标截取的方式声明了一个int类型的切片， 这个时候 int1切片的data属性的指针地址和ints的指针地址是一样的，长度为1，容量为3。我们对int1进行下标修改，同时ints对应的元素值也会修改。

接着我们使用Go内置的append函数对int1进行追加，使之长度发生了改变，这个时候int1的长度小于容量，指针不会被重新分配，但是追加数据不会影响ints，因为ints的长度为2，下标未满足条件，访问不了int1追加的元素。

接着我们使用Go内置的append函数对ints进行追加，使之长度发生了改变，这个时候ints的长度小于容量，指针不会被重新分配，但是追加数据会影响int1，在底层数组上int1是ints的子集。

range遍历切片有什么要注意的？
```go
func main() {
    users := []User{
        {"张三", 18},
        {"李四", 34},
        {"王五", 21},
    }
    for _, v := range users{
        if v.Age != 20{
            v.Age = 20
        }
    }
    fmt.Println(users) // [{张三 18} {李四 34} {王五 21}]
}
```
使用range遍历切片users，变量v是拷贝切片中的数据，修改拷贝数据不会对原切片有影响。
