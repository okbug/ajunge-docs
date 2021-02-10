let fn = ()=>{
    console.log('开始异步加载了');
    import('./title.js')
};
fn();