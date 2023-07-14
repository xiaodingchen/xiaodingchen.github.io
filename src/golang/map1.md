---
title: Go面试之map、struct、interface
order: 3
category:
- golang
tag: [go, golang, map, interface, struct, 源码, 面试, 面试总结]
---

## map
Go里的map用于存放key/value对，在其它地方常称为hash、dictionary、关联数组，这几种称呼都是对同一种数据结构的不同称呼，它们都用于将key经过hash函数处理，然后映射到value，实现一一对应的关系。

在Go中map的元素是无序的，遍历时是随机的。map是一个指针，底层是数组，所以map是引用类型。在函数中map作为参数传递时，若函数内部对map做了相关修改，函数外的map也会被修改。

通过下面的示例对map进行声明和创建

```go
var m map[string]int // 声明一个map类型的变量,nil map，它将不会做任何初始化，不会指向任何数据结构
m := make(map[string]int) // 初始化，创建一个map
m := map[string]int{} // 空map， 初始化，创建一个map
```
len()函数用于获取map中元素的个数，即有多个少key。delete()用于删除map中的某个key。

map的key可以是任意内置的数据类型(如int)，或者其它可以通过"==" 进行等值比较的数据类型，如interface和指针可以。slice、数组、map、struct类型都不能作为key。map的值可以是任意对象，包括函数、指针、stuct等等。下面的示例将会展示map的相关操作

```go
func main() {
    var m map[string]int // 声明一个map类型的变量
    m = make(map[string]int) // 初始化一个map
    m["a"] = 1 // 更新一个key/value值
    i, ok := m["b"] // 获取一个key值，ok是一个bool值，用来判断key是否存在
    l := len(m)    // 获取map的长度，即元素个数
    delete(m, "a") // 删除指定的key
    for k, v := range m{
    
	} // 遍历map
}
```
map同slice一样都是线程不安全的数据类型，多协程操作时需要注意。

## struct
struct定义结构，结构由字段(field)组成，每个field都有所属数据类型，在一个struct中，每个字段名都必须唯一。每个字段都有类型，可以是任意类型，包括内置简单数据类型、其它自定义的struct类型、当前struct类型本身、接口、函数、channel等等。声明如下：

```go
type User struct{
    Name string
    Age int
}
构造struct实例
var u User // 初始化一个实例
// 除此之外，还可以使用new()函数或&TYPE{}的方式来构造struct实例，它会为struct分配内存，为各个字段做好默认的赋0初始化。它们是等价的，都返回数据对象的指针给变量，
// 实际上&TYPE{}的底层会调用new()。
var u *User
u = &User{}
```
从上面的代码示例我们可以看到struct实例可以是一个值也可以是一个指针。尽管一个是数据对象值，一个是指针，它们都是数据对象的实例。

在函数中我们传递一个对象的实例可以是对象的值也可以是对象的指针，Go中的参数传递其本质都是以复制的方式传递的。若对象实例中数据比较复杂，建议使用指针作为参数值进行传递。

在struct中，field除了名称和数据类型，还可以有一个tag属性。tag属性用于"注释"各个字段，除了reflect包，正常的程序中都无法使用这个tag属性。
```go
type User struct{
    Name string `json:"user"`
    Age int `json:"age"`
}
```
struct中的字段可以不用给名称，这时称为匿名字段。匿名字段的名称强制和类型相同。例如：
```go
type animal struct {
    name string
    age int
}
type Horse struct{
	inter
    animal
    sound string
}
```
上面的Horse中有两个匿名段inter和animal，它的名称和类型都是inter和animal。
在上面Horse中嵌套了其它的struct(如animal)。其中animal称为内部struct，Horse称为外部struct。

假如外部struct中的字段名和内部struct的字段名相同，会如何？

有以下两个名称冲突的规则：

1. 外部struct覆盖内部struct的同名字段、同名方法
2. 同级别的struct出现同名字段、方法将报错
第一个规则使得Go struct能够实现面向对象中的重写(override)，而且可以重写字段、重写方法。
第二个规则使得同名属性不会出现歧义。
struct可以嵌套自身的特性使之在实现树和链表上更加方便。

### struct的方法
```go
type Person struct{
    Name string
    Age int
}
func (u Person)SetName(name string){
    u.Name = name
}
func (u *Person)SetAge(age int){
    u.Age = age
}
```
除了实例有值类型和指针类型的区别，方法也有值类型的方法和指针类型的区别 setname()方法中是值类型的receiver，setage()方法中是指针类型的receiver。它们是有区别的。

首先，setage()方法的p是一个指针类型的person实例，所以方法体中的p.age实际上等价于(*p).age。

再者，方法就是函数，Go中所有需要传值的时候，都是按值传递的，也就是拷贝一个副本。

setname()中，除了参数name string需要拷贝，receiver部分(p person)也会拷贝，而且它明确了要拷贝的对象是值类型的实例，也就是拷贝完整的person数据结构。但实例有两种类型：值类型和指针类型。(p person) 无视它们的类型，因为receiver严格规定p是一个值类型的实例。所以无论是指针类型的p1实例还是值类型的p2实例，都会拷贝整个实例对象。对于指针类型的实例p1，前面说了，在需要的时候，Go会自动解除引用，所以p1.setname() 等价于(*p1).setname()。

也就是说，只要receiver是值类型的，无论是使用值类型的实例还是指针类型的实例，都是拷贝整个底层数据结构的，方法内部访问的和修改的都是实例的副本。所以，如果有修改操作，不会影响外部原始实例。

setage()中，receiver部分(p *person)明确指定了要拷贝的对象是指针类型的实例，无论是指针类型的实例p1还是值类型的p2，都是拷贝指针。所以p2.setage()等价于(&p2).setage()。

也就是说，只要receiver是指针类型的，无论是使用值类型的实例还是指针类型的实例，都是拷贝指针，方法内部访问的和修改的都是原始的实例数据结构。所以，如果有修改操作，会影响外部原始实例。

那么选择值类型的receiver还是指针类型的receiver？一般来说选择指针类型的receiver。

### struct的比较
struct是可以比较，但同时也是不可以比较的，这个要看struct的场景。在 Go 语言中，Go 结构体有时候并不能直接比较，当其基本类型包含：slice、map、function 时，是不能比较的。若强行比较，就会导致出现例子中的直接报错的情况。而指针引用，其虽然都是 new(string)，从表象来看是一个东西，但其具体返回的地址是不一样的。

如果我们被迫无奈，被要求一定要用结构体比较怎么办？这时候可以使用反射方法 reflect.DeepEqual，如下：

```go
func main() {
    v1 := Value{Name: "对", GoodAt: []string{"的", "额", "我"}}
    v2 := Value{Name: "对", GoodAt: []string{"的", "额", "我"}}
    if reflect.DeepEqual(v1, v2) {
    fmt.Println("yes")
        return
    }

    fmt.Println("no")
}
```

## interface
接口(interface)是一种类型，用来定义行为(方法)。
```go

type User interface{
    GetName() string
    SetName(name string)
}

type Person struct{
    Name string
}
func (p *Person) GetName()string  {
    return p.Name
}
func (p *Person)  SetName(name string){
    p.Name = name
}

var u User
p := &Person{}
u = p // 当接口实例中保存了自定义类型的实例后，就可以直接从接口上调用它所保存的实例的方法
u.SetName("dddd")
fmt.Println(u.GetName())
```
上面的示例，Person实例实现了User接口。

接口类型是指针类型，但是它到底存放了什么东西？接口类型的数据结构是2个指针，占用2个机器字长。第一个是指针指向实例的类型信息和方法集，第二个指针就是实例的指针地址。

### 方法集
方法集是类型的方法集合，对于非接口类型，每个类型都分两个Method Set：值类型实例是一个Method Set，指针类型的实例是另一个Method Set。两个Method Set由不同receiver类型的方法组成。

值类型的实例的Method Set只由值类型的receiver(T Type)组成

指针类型的实例的Method Set由值类型和指针类型的receiver共同组成，即(T Type)和(T *Type)

从实现接口方法的角度上看：

如果某类型实现接口的方法的receiver是(T Type)类型的，那么只有指针类型的实例T才算是实现了这个接口，因为这个方法不在值类型的实例T方法集中

如果某类型实现接口的方法的receiver是(T Type)类型的，那么值类型的实例T和指针类型的实例T都算实现了这个接口，因为这个方法既在值类型的实例T方法集中，也在指针类型的实例T方法集中

### 空interface
空接口是指没有定义任何接口方法的接口。没有定义任何接口方法，意味着Go中的任意对象都可以实现空接口(因为没方法需要实现)，任意对象都可以保存到空接口实例变量中。

```go
type empty_int interface{}
// 声明一个空接口实例
var i interface{}
```
可以定义一个空接口类型的array、slice、map、struct等，这样它们就可以用来存放任意类型的对象，因为任意类型都实现了空接口。

```go
any := make([]interface{}, 5)
any[0] = 11
any[1] = "hello world"
any[2] = []int{11, 22, 33, 44}
for _, value := range any {
    fmt.Println(value)
}
```
显然，通过空接口类型，Go也能像其它动态语言一样，在数据结构中存储任意类型的数据。

空接口是一种接口，它是一种指针类型的数据类型，虽然不严谨，但它确实保存了两个指针，一个是对象的类型(或iTable)，一个是对象的值。所以上面的赋值过程是让空接口any保存各个数据对象的类型和对象的值。

### interface类型断言和type-switch
接口实例中可以存放各种实现了接口的类型实例，在有需要的时候，还可以通过ins.(Type)或ins.(*Type)的方式将接口实例ins直接转回Type类型的实例。

```go
var i int = 30
var ins interface{}
```

// 接口实例ins中保存的是int类型
```go
ins = i
x := ins.(int) // 接口转回int类型的实例i
println(x)     //输出30
```
注意，接口实例转回时，接口实例中存放的是什么类型，才能转换成什么类型。同类型的值类型实例和指针类型实例不能互转，不同类型更不能互转。

在不能转换时，Golang将直接以Panic的方式终止程序。但可以处理转换失败时的panic，这时需要类型断言，也即类型检测。

```go
// 如果ins保存的是值类型的Type，则输出
if t, ok := ins.(Type); ok {
    fmt.Printf("%T\n", v)
}

// 如果ins保存的是指针类型的*Type，则输出
if t, ok := ins.(*Type); ok {
    fmt.Printf("%T\n", v)
}

// 一个返回值的探测
t := ins.(Type)
t := ins.(*Type)
```
直接用`if v,ok := ins.(Type);ok {}`的方式做类型探测在探测类型数量多时不是很方便，需要重复写if结构。

Golang提供了switch...case结构用于做多种类型的探测，所以这种结构也称为type-switch。这是比较方便的语法，比如可以判断某接口如果是A类型，就执行A类型里的特有方法，如果是B类型，就执行B类型里的特有方法。

```go
switch v := ins.(type) {
    case *Square:
        fmt.Printf("Type Square %T\n", v)
    case *Circle:
        fmt.Printf("Type Circle %T\n", v)
    case nil:
        fmt.Println("nil value: nothing to check?")
    default:
        fmt.Printf("Unexpected type %T", v)
}

```

