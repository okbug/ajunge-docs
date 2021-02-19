import {createApp} from 'vue'
import MessageComponent from './message'

const wrapper = document.createElement('div');

let style = {
    position:'fixed',
    top:'10px',
    left:'20%',
    width:'60%'
}
for(let key in style){
    wrapper.style[key] = style[key];
}
document.body.appendChild(wrapper);

const Message = (options) =>{ // 最终调用的就是此方法
    // 弹框需要放到body下,防止某个元素 写了overflowHidden  teleport (固定的面板)
    const messageBox = document.createElement('div');
    let app = createApp(MessageComponent,options); // 单元测试的实现
    app.mount(messageBox); // $el
    wrapper.appendChild(messageBox);
    setTimeout(() => {
        app.unmount();
        wrapper.removeChild(messageBox);
    }, options.duraction || 5000);
}   

['success','info','warning','error'].forEach(type=>{
    Message[type] = function(options){
        options.type = type;
        return Message(options);
    }
})
//Message.success({message:''})



export default Message;