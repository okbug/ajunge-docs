// node中基本用法， 讲点api

// node中为了实现 i/o操作 自己实现了一个libuv (事件环的概念) -》 异步操作 靠的多线程

console.log(this); // 服务端全局变量原则是是global， 但是node在执行的时候为了实现模块化，会在执行代码时，外部包装一个函数，这个函数在执行的时候 会改变this指向

// console.dir(global); // 浏览器中是window  setImmediate 这个是node自己实现


// 可以直接访问这些变量
// process  __filename, __dirname, exports ,module  ,require (这5个变量都是函数的参数)
// 后面的五个属性 都可以直接访问在文件中，但是不能通过global来获取


// Buffer
// console.log(Object.keys(process));

// platform  windows -》 win32   mac => darwin
console.log(process.platform); // 识别系统
// cwd  current working directory (你在哪执行的这个文件)
console.log(process.cwd()); // 获取执行命令时的路径， webpack(查找配置文件，在当前执行命令的路径下查找)
console.log(__filename); // 代表文件的所在位置 是一个绝对路径
console.log(__dirname); // 文件所在的目录  是一个绝对路径
// env 环境变量，默认我们代码在执行的时候回去读取电脑中的环境
console.log(process.env.NODE_ENV); // 在执行命令的时候（添加的变量） 可以去读取环境变量中的属性
// windows下 可以使用 set 命令来设置  mac export  -》 cross-env, 窗口关掉就消失了

let requestUrl = ''
if(process.env.NODE_ENV === 'develpoment'){
    requestUrl = 'http://localhost'
}else{
    requestUrl = 'http://39.106.175.18xxx'
}
// argv

// let args = process.argv.slice(2) // 执行命令时所带的参数 1.代表的是可执行node.exe 2.执行的是哪个文件
// let userArgs = args.reduce((memo,current,index,arr)=>{
//     if(current.includes('--')){
//         memo[current.slice(2)] = arr[index + 1] || true
//     }
//     return memo;
// },{})
// console.log(userArgs)


// commander 命令行管家，第三方模块用的时候需要下载 
// const { program } = require('commander');
// program.version('0.0.1');
// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza')
//   .command('run').action(()=>{
//       console.log('run')
//   });

// program.parse(process.argv);
// const options = program.opts();
// console.log(options)

// https://www.npmjs.com/package/commander
// github.com/tj/commander.js
// nextTick  node的事件环





process.nextTick(()=>{ // 异步的，把他叫成微任务。不属于事件环的一部分， 下一队列，本轮任务执行完毕后，会立即执行他的回调函数
    console.log('nextTick')
})

Promise.resolve().then(()=>{ // promise 也不属于node中的事件环
    console.log('promise')
})

// node中自己实现了一个事件环机制 （新版本的node执行结果和浏览器执行的结果一直） 底层实现的方式不太一样
// 对于浏览器宏任务只有一个队列，对于我们的node而言 setImmediate、setTimeout 创造了多个宏任务队列



// 如果在i/o操作中下一个事件队列要执行的是check，所以setImmediate优先级高于 setTimeout
require('fs').readFile('./note.md',()=>{
    setTimeout(() => {
        console.log('settimeout')
    }, 0); // 0 不代表直接就会放到 timers 队列中
    
    setImmediate(() => {
        console.log('setImmediate')
    });
})

// node和浏览器事件环的差异 浏览器1个队列  node多个队列
// 执行顺序都是 先执行代码 -》 （node会清空nextTick） -》 清空微任务 =》 在去取出一个和宏任务来执行， 当到达poll阶段后，如果check阶段为空，而且poll里面也没有io操作，此时，不会继续轮训，会等待定时器到达时间，重新执行 / 或者有新的i/o操作进入到poll阶段中

// process.nextTick 用的比较多 