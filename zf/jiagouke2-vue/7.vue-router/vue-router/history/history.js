import { History } from "./base";

class BrowserHistory extends History{
    setupListener(){
        window.addEventListener('popState',()=>{
            // 当hash值变化了 在次拿到hash值进行跳转
            this.transitionTo(getHash()); // hash变化在次进行跳转
        })
    }
}

export default BrowserHistory