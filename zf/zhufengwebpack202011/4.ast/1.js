require.e("hello").then(
    ()=>{
        //其实不是Promise
       return  require("./src/hello.js");
    }
    ).then((result) => {
    console.log(result.default);
});

let p = new Promise((resolve)=>{
    resolve(100);
});
p.then(()=>{
    return 200;
}).then(result=>{
    console.log(result);
});