function* other(){
    console.log(2);
    yield 2;
   //如果在这里只执行一次2,并没有继续向下执行，表示这个generator没有结束 
    yield 3;
    console.log(3);
    setTimeout(() => {
        console.log(100);
    }, 1000);
    
}
function * gen(){
    yield 1;
    console.log(1);
    yield  other();
    yield 4;// 上面other没有打印3，也就是说没有结束 ，并不影响gen向下继续执行打印4
    console.log(4);
}
function singleCo(generator){
    let it = typeof generator === 'function'?generator():generator;
    it.next();
}
//yield *是个专业的语法，它可以自动展开执行iterator
function co(generator){
    let it = typeof generator === 'function'?generator():generator;
    function next(value){
     let result = it.next(value);
     if(!result.done){
         //如果result.value是一个迭代器的话 ，我们需要让这个迭代器自己走类似CO的逻辑
         if(typeof result.value[Symbol.iterator]==='function'){
            //让这个iterator自动启动执行
            //这句话就是相当于开启了一个新子进程，只是一个比喻。不是真的开了新的子进程
            singleCo(result.value);
            //另外不能阻塞当前的saga,当前的saga 会立刻接着向下执行
         }
         next(result.value);
     }
        
    }
    next();
}
co(gen);
//阻塞不阻塞应该是看runSaga函数中的next方法是否调用 了吧 
