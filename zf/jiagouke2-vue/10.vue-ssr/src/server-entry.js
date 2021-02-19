import createApp from './app';



export default ()=>{
    const {app} = createApp();
    return app; // 每次都是一个新的  只是产生一个实例 服务端根据实例 创建字符串
} 
