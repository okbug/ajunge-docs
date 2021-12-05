# 问题的起源
源于前两天我在参加面试的时候，面试官问我，有没有使用过 Fetch API？
并且询问我，没有使用 `json` 或者 `text` 方法前，请求得到的结果是啥？这把我难住了，于是乎，周末特地自己学习了一番，发现挺有意思

# Fetch API 的简单介绍
也许大家都接触过并且使用过，所以就简单介绍下
Fetch是ES6之后新出的一种异步请求的方法，内置于浏览器之中
并且使用了同样是ES6之后出来的Promise。
> 注: Fetch并不属于XHR，希望大家可以提前了解这一点

# Fetch API 的基本使用

大家应该都有使用过，举个最简单的例子

```js
fetch('./data.json')
  .then(data => data.json())
  .then(console.log);
```

这个时候，我们就可以在控制台看到，打印了一个对象/数组，是和我们本地下面的 `data.json` 文件内容近乎一样的。
> 注: 需要启动一个http server，推荐使用vscode 自带的live server功能，因为使用File协议是不能发起请求的

那么我们改动一下代码：打印一下第一个Promise实例中返回的结果，除了`json`、`text` 方法之外，还有什么
```js
fetch('./data.json')
  .then(data => {
    console.log(data); // 添加了这一行
    return data.json();
  })
  .then(console.log);
```

可以看到打印出来的是一个 `Response` 对象
里面有:
- body `ReadableStream` 实例
  - body中有一个locked属性，是一个布尔值
  - 它是一个 `ReadableStream` 对象 后面我们也会讲到它
- bodyUsed 布尔值
- headers Headers对象
- ok 布尔值
- redirected 布尔值
- status HTTP状态码
- statusText 字符串
- type 请求的类型
- url 请求的URL

以上属性都是在这个对象实例上的
在这个对象的原型上，还有一些方法和属性
这里就不一一列举，挑出几个方法讲一下:
- arrayBuffer
- blob
- clone
- formData
- json
- text

并且除了这些方法之外，有很多的字段是和实例上一样的，那么可以猜测，实例上的body,bodyUsed等等属性其实就是继承于 `Response` 类的

而且从上面的方法可以得知，调用这些方法就是将我们的数据转为以上的类型
而且还有一个clone方法，我们执行以下这个方法后打印，可以发现，其实是了一个和原数据一样的实例，并且原型就是原对象
可以猜测clone方法类似我们的 `Object.create` 创建了一个新的对象 并且不影响原对象。
并且我们可以再次进行以下代码的尝试:

```js
fetch('./data.json')
  .then(data => {
    console.log(data.json());
    console.log(data.text());
    return data.json();
  })
  .then(console.log);
```

这段代码运行之后，可以看到有浏览器的报错产生: `TypeError: Failed to execute 'text' on 'Response': body stream already read`


可以得知，我们的数据只能被类似的方法调用一次.
如何解决呢，可以使用上面提到的`clone`方法，克隆一个新的对象出来，再去使用一些将数据转为其他数据格式的方法，参考以下代码

```js
fetch('./data.json')
  .then((data) => {
    console.log(data);
    const data2 = data.clone();
    console.log(data2.text());
    return data.json();
  })
```
通过上面的方法，我们就可以对同一个数据源进行数据的转换。

并且我们可以再来看一下，`body` 属性背后的 `ReadableStream` 是什么东西
通过查看MDN，可以得知，它是属于 **流** 的一种数据格式，它是一种可读取的二进制流。
**流** 这个概念，在Nodejs中其实是很经常看到的，涉及到文件的传输，而且我们fetchAPI本质上就是去获取某个文件。
并且在原型上，有`cancel`, `pipeTo`, `getReader`, `tee`等方法，
其中的getReader方法，意在创建一个读取器并将流锁定于其上。一旦流被锁定，其他读取器将不能读取它，直到它被释放。。
那么，我们可以参考这个方法以及上面提到的body中的locked来推断，我们不能第二次调用`text`, `json` 等方法是不是和这个有关系
写入以下代码:
```js
fetch('./data.json')
  .then((data) => {
    console.log(data.body.locked);
    let res = data.json();
    console.log(data.body.locked);
    return res;
  })
  .then(console.log);
```

结果如下:

![image.png](https://cxwht.cn/usr/uploads/2021/12/3901126511.png)


不难看出，我们在调用了转换数据格式的方法后，我们的body就会被"锁"，并且不能执行其他的转换，所以只能clone之后再去执行其他操作，并且我们的clone操作也是需要在数据转换前使用，否则会报:`ncaught (in promise) TypeError: Failed to execute 'clone' on 'Response': Response body is already used` 这样的错误，提示我们， `body` 已经使用过了，不能再被clone了。并且在经过尝试后发现，手动控制locked属性没法解锁我们的`body`对象

# 实现一个json/text方法
从上面我们可以知道，ReadableStream的getReader方法可以锁定我们的二进制流，那么我们不执行json方法，执行一下body的getReader方法来看一下。
并且通过查阅官网，可以知道返回的是一个`ReadableStreamDefaultReader` 实例，里面有一个`read`方法，返回一个Promise实例，并且得到一个迭代器
当stream传完所有数据时，迭代器的done属性变成true, value属性变成undefined
```js
const { body } = data;
let res = body.getReader();
console.log(res)
res.read()
  .then(it => {
    console.log(it)
  })
```

看到打印出来的是如下所示:
![image.png](https://cxwht.cn/usr/uploads/2021/12/3451237229.png)

由于我这边源文件是一个内容为 123abc 的文本，那么不难猜出，这里的value数组中，就是每一个字符的ASCII码，我们可以通过使用JS中的 `String.fromCharCode` 方法获取他们所对应的ASCII字符.

```js
res.read()
  .then(it => {
    const arr = it.value;
    let str = '';
    arr.forEach(s => {
      str += String.fromCharCode(s)
    })
    return str
  })
  .then(console.log)
```

那么我们就可以获取到流所对应的字符串，那么我们将测试的文件改成json格式的试试。
发现是同样可行的，那么 json方法的实现，我们只需要将这个生成的字符串使用 `JSON.parse` 方法，就可以实现

全部代码

```js
fetch("./data.json")
  .then((data) => {
    console.log(data.body.locked)
    const {body} = data;
    let reader = body.getReader();
    let res = reader.read()
      .then(it => {
        const arr = it.value;
        let str = '';
        arr.forEach((s) => {
          str += String.fromCharCode(s);
        });
        return JSON.parse(str);
      })
    console.log(data.body.locked)
    return res;
  })
  .then(e => {
    console.log(e)
  })
```

控制台结果如下:
![image.png](https://cxwht.cn/usr/uploads/2021/12/766841096.png)

进一步封装方法:

```js
function text(data) {
  const { body } = data;
  let reader = body.getReader();
  let res = reader.read().then((it) => {
    const arr = it.value;
    let str = "";
    arr.forEach((s) => {
      str += String.fromCharCode(s);
    });
    return str;
  });
  return res;
}

function json(data) {
  return Promise.resolve(text(data)).then(data => JSON.parse(data))
}
fetch("./data.json")
  .then((data) => {
    console.log(data.body.locked);
    const { body } = data;
    let res = json(data)
    console.log(data.body.locked);
    return res;
  })
  .then((e) => {
    console.log(e);
  });
```

和之前的效果都差不多，当然，此处只考虑了第一次获取数据，如果我们的数据流迭代器有不断的数据流过来的话，是需要不断去运行迭代器获得数据的，因为涉及到ReadableStream等知识，这里我们可以看MDN上的示例。

```js
fetch("https://www.example.org/").then((response) => {
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      // 下面的函数处理每个数据块
      function push() {
        // "done"是一个布尔型，"value"是一个Uint8Array
        reader.read().then(({ done, value }) => {
          // 判断是否还有可读的数据？
          if (done) {
            // 告诉浏览器已经结束数据发送
            controller.close();
            return;
          }

          // 取得数据并将它通过controller发送给浏览器
          controller.enqueue(value);
          push();
        });
      };

      push();
    }
  });

  return new Response(stream, { headers: { "Content-Type": "text/html" } });
});
```

# 总结
流的概念在前后端传输中很常见，并且在Nodejs中也有一些类似的API，这里就不过多去阐述，其实主要是为了让大家看我们(可能)经常使用的 Fetch API 中的一些细节问题，也是我们平常容易忽视的一些点。


> 参考链接：
> [Fetch API - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
> [ReadableStream - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream)
> [使用Fetch - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
> [Streams API - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Streams_API)
> [getReader - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream/getReader)