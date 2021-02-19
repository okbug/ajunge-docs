import install from './install'
import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import BrowserHistory from './history/history';

class VueRouter {
    constructor(options) {
        // 根据用户的配置 和当前请求的路径 渲染对应的组件 

        // 创建匹配器 可用用于后续的匹配操作 
        // 用户没有传递配置 就默认传入一个空数组  
        // 1.match通过路由来匹配组件 
        // 2.addRoutes 动态添加匹配规则 

        // 给实例添加matcher属性 
        this.matcher = createMatcher(options.routes || []);

        // 我需要根据不同的 路径进行切换
        options.mode = options.mode || 'hash'; // 默认没有传入就是hash模式
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this);
                break;
            case 'history':
                this.history = new BrowserHistory(this);
                break;
        }
        this.beforeHooks = [];
    }
    push(to){
        this.history.push(to);
    }
    go(){
        
    }
    match(location){
        return this.matcher.match(location);
    }
    init(app) { // 初始化
        // 监听hash值变化 默认跳转到对应的路径中
        const history = this.history;
        const setUpHashListener = () =>{
            history.setupListener(); // 监听路由变化 hashchange
        }
        // 初始化 会先获得当前hash值 进行跳转, 并且监听hash变化
        history.transitionTo(
            history.getCurrentLocation(), // 获取当前的位置
            setUpHashListener
        )
        history.listen((route)=>{ // 每次路径变化 都会调用此方法  订阅
            app._route = route;
        });
        // setupListener  放到hash里取
        // transitionTo  放到base中 做成公共的方法
        // getCurrentLocation // 放到自己家里  window.location.hash / window.location.path
    }
    beforeEach(fn){
        this.beforeHooks.push(fn);
    }
}
VueRouter.install = install
// 默认vue-router插件导出一个类，用户会new Router({})

export default VueRouter;

