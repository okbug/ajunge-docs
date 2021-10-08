let fs = require('fs').promises;


// async 函数执行完毕后 是返回一个promise
async function read() { // 更像同步
    try{
        const a = await 'b.txt';
        const b = await fs.readFile(a, 'utf8');
        return b;
    }catch(e){
        console.log(e)
    }
}

read().then(data => {
    console.log('success',data);
},err=>{
    console.log(err)
})

// async + await => co + generator (语法糖 吃起来甜 用起来简单)
// 看起来像同步方法 但是内部还是递归调用异步方法