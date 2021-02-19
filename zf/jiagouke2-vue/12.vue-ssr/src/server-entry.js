import createApp from './app';


// 此方法是服务端运行的
export default (context)=>{ // context.url 这里包含着当前访问服务端的路径
    return new Promise((resolve,reject)=>{
        const {app,router,store} = createApp();

        router.push(context.url); // 默认跳转到路径里，有异步组件

        router.onReady(()=>{

            const matchComponents = router.getMatchedComponents(); // 获取匹配到的组件
            if(matchComponents.length > 0){ // 匹配到路由了
                // 调用组件对应的asyncData
                Promise.all(matchComponents.map(component=>{
                    // 需要所有的asyncdata方法执行完毕后 才会响应结果
                    if(component.asyncData){
                        // 返回的是promise
                        return component.asyncData(store);
                    }
                })).then(()=>{
                    context.state = store.state;// 将状态放到上下文中

                    resolve(app)// 每次都是一个新的  只是产生一个实例 服务端根据实例 创建字符串 
                },reject)
                
            }else{
                reject({code:404});  // 没有匹配到路由
            }

            
        },reject)
    
        // return app; 
    })
} 


