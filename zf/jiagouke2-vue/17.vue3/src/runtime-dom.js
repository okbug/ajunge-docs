// 运行时的包 里面放着dom 操作的方法
export const nodeOps = { // 抽离的目的 可以重写这些方法 vue3 自定义渲染器
    insert(child,parent,anchor){
        if(anchor){
            parent.insertBefore(child,anchor);
        }else{
            parent.appendChild(child);
        }
    },
    remove(child){
        const parent = child.parentNode;
        parent && parent.removeChild(child);
    },
    createElement(tag){
        return document.createElement(tag);
    },
    hostSetElementText(el,text){
        el.textContent = text;
    },
    // 属性操作 。。。。
    hostPatchProps(el,key,prevProps,nextProps){
        if(/^on[^a-z]/.test(key)){ // 事件   onClick
            const eventName = key.slice(2).toLowerCase();
            // 更新事件 // onClick
            prevProps &&  el.removeEventListener(eventName,prevProps);
            nextProps && el.addEventListener(eventName,nextProps);
        }else{
            // 其他属性
            if(nextProps == null){
                return el.removeAttribute(key); // 删除元素上的属性
            }
            if(key == 'style'){
                for(let key in nextProps){
                    el.style[key] = nextProps[key];
                }
                for(let key in prevProps){
                    if(!nextProps.hasOwnProperty(key)){
                        el.style[key] = null;
                    }
                }
            }else{ // id class 
                el.setAttribute(key,nextProps) 
            }
        }
    }
}