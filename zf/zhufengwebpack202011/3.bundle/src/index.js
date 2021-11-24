

let lazyLoadButton = document.getElementById('lazyLoad');
lazyLoadButton.addEventListener('click',()=>{
    import(/* webpackChunkName: "hello" */'./hello').then(result=>{
        console.log(result.default);
    })
});
let a =1;