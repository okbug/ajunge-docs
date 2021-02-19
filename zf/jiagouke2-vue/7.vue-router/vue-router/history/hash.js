import { History } from "./base";


function ensureSlash() {
    if(window.location.hash){ // location.hash 是有兼容性问题的 
        return;
    }
    window.location.hash = '/'; // 默认就是 / 路径即可
}
function getHash(){
    return window.location.hash.slice(1);
}
class HashHistory extends History{
    constructor(router){
        super(router);
        this.router = router;
        // 确保hash模式下 有一个/路径
        ensureSlash();
    }
    getCurrentLocation(){
        // 这里也是要拿到hash值
        return getHash();
    }
    push(location){
        this.transitionTo(location,()=>{ // 去更新hash值，hash值变化后虽然会再次跳转但是 不会重新更新current属性
            window.location.hash = location
        })
    }
    setupListener(){
        window.addEventListener('hashchange',()=>{
            // 当hash值变化了 在次拿到hash值进行跳转
            this.transitionTo(getHash()); // hash变化在次进行跳转
        })
    }
}

export default HashHistory