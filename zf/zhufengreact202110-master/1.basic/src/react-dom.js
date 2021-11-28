import { REACT_TEXT, REACT_FORWARD_REF, MOVE, PLACEMENT, REACT_CONTEXT, REACT_PROVIDER, REACT_MEMO } from "./constants";
import { addEvent } from './event';

let hookStates = [];//这是一个数组，用来记录状态
let hookIndex = 0;//索引当前hook的索引
let scheduleUpdate;//调度更新的方法

function render(vdom, container) {
    mount(vdom, container);
    scheduleUpdate = () => {
        hookIndex = 0;
        //每次更新都要从根节点开始进行DOM DIFF
        compareTwoVdom(container, vdom, vdom);
    }
}
export function useState(initialState) {
    /*  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
     let currentIndex = hookIndex;
     function setState(newState) {
         if (typeof newState === 'function') {
             newState = newState(hookStates[currentIndex]);
         }
         hookStates[currentIndex] = newState;
         scheduleUpdate();
     }
     return [hookStates[hookIndex++], setState]; */
    return useReducer(null, initialState)
}
export function useReducer(reducer, initialState) {
    hookStates[hookIndex] = hookStates[hookIndex] || initialState;
    let currentIndex = hookIndex;
    function dispatch(action) {
        if (typeof action === 'function') {
            action = action(hookStates[currentIndex]);
        }
        hookStates[currentIndex] = reducer ? reducer(hookStates[currentIndex], action) : action;
        scheduleUpdate();
    }
    return [hookStates[hookIndex++], dispatch];
}
export function useMemo(factory, deps) {
    if (hookStates[hookIndex]) {//判断一下是否是首次渲染
        //如果是更新的时候 ，也就是说不是初次渲染
        let [lastMemo, lastDeps] = hookStates[hookIndex];
        //如果老的依赖数组和新的依赖数且完全一样，true 否则 返回false
        let allTheSame = deps.every((item, index) => item === lastDeps[index]);
        if (allTheSame) {
            hookIndex++;
            return lastMemo;
        } else {
            let newMemo = factory();
            hookStates[hookIndex++] = [newMemo, deps];
            return newMemo;
        }
    } else {//说明是首次渲染
        let newMemo = factory();//{number:0}
        hookStates[hookIndex++] = [newMemo, deps];
        return newMemo;
    }
}
export function useCallback(callback, deps) {
    if (hookStates[hookIndex]) {//判断一下是否是首次渲染
        //如果是更新的时候 ，也就是说不是初次渲染
        let [lastCallback, lastDeps] = hookStates[hookIndex];
        //如果老的依赖数组和新的依赖数且完全一样，true 否则 返回false
        let allTheSame = deps.every((item, index) => item === lastDeps[index]);
        if (allTheSame) {
            hookIndex++;
            return lastCallback;
        } else {
            hookStates[hookIndex++] = [callback, deps];
            return callback;
        }
    } else {//说明是首次渲染
        hookStates[hookIndex++] = [callback, deps];
        return callback;
    }
}
export function useEffect(callback, deps) {
    let currentIndex = hookIndex;
    if (hookStates[hookIndex]) {//判断一下是否是首次渲染
        //如果是更新的时候 ，也就是说不是初次渲染
        let [destroy, lastDeps] = hookStates[hookIndex];
        //如果老的依赖数组和新的依赖数且完全一样，true 否则 返回false
        let allTheSame = deps && deps.every((item, index) => item === lastDeps[index]);
        if (allTheSame) {
            hookIndex++;
        } else {
            //执行上一个销毁函数
            destroy && destroy();
            setTimeout(() => {
                hookStates[currentIndex] = [callback(), deps];//[effect的销毁函数,依赖数组]
            });
            hookIndex++;
        }
    } else {//说明是首次渲染
        //因为useEffect需要延迟执行，所以说需要包装成一个宏任务,不会阻塞当前的页面渲染
        setTimeout(() => {
            hookStates[currentIndex] = [callback(), deps];//[effect的销毁函数,依赖数组]
        });
        hookIndex++;
    }
}
export function useLayoutEffect(callback, deps) {
    let currentIndex = hookIndex;
    if (hookStates[hookIndex]) {//判断一下是否是首次渲染
        //如果是更新的时候 ，也就是说不是初次渲染
        let [destroy, lastDeps] = hookStates[hookIndex];
        //如果老的依赖数组和新的依赖数且完全一样，true 否则 返回false
        let allTheSame = deps && deps.every((item, index) => item === lastDeps[index]);
        if (allTheSame) {
            hookIndex++;
        } else {
            //执行上一个销毁函数
            destroy && destroy();
            queueMicrotask(() => {
                hookStates[currentIndex] = [callback(), deps];//[effect的销毁函数,依赖数组]
            });
            hookIndex++;
        }
    } else {//说明是首次渲染
        //因为useEffect需要延迟执行，所以说需要包装成一个宏任务,不会阻塞当前的页面渲染
        queueMicrotask(() => {
            hookStates[currentIndex] = [callback(), deps];//[effect的销毁函数,依赖数组]
        });
        hookIndex++;
    }
}
function mount(vdom, parentDOM) {
    //把虚拟DOM变成真实DOM
    let newDOM = createDOM(vdom);
    //把真实DOM追加到容器上
    if (newDOM) parentDOM.appendChild(newDOM);
    if (newDOM && newDOM.componentDidMount)
        newDOM.componentDidMount();
}

/**
 * 把虚拟DOM变成真实DOM
 * @param {*} vdom 虚拟DOM
 * @return 真实DOM
 */
function createDOM(vdom) {
    let { type, props, ref } = vdom;
    let dom;//真实DOM
    if (type && type.$$typeof === REACT_MEMO) {
        return mountMemoComponent(vdom);
    } else if (type && type.$$typeof === REACT_PROVIDER) {
        return mountProviderComponent(vdom);
    } else if (type && type.$$typeof === REACT_CONTEXT) {
        return mountContextComponent(vdom);
    } else if (type && type.$$typeof === REACT_FORWARD_REF) {
        return mountForwardComponent(vdom);
    } else if (type === REACT_TEXT) {//创建文件节点
        dom = document.createTextNode(props.content);
    } else if (typeof type === 'function') {
        if (type.isReactComponent) {//说明这是一个类组件
            return mountClassComponent(vdom);
        } else {
            return mountFunctionComponent(vdom);
        }
    } else if (typeof type === 'string') {//创建DOM节点 span div p
        dom = document.createElement(type);
    }
    if (props) {
        //更新DOM的属性 后面我们会实现组件和页面的更新。
        updateProps(dom, {}, props);
        let children = props.children;
        //如果说children是一个React元素，也就是说也是个虚拟DOM
        if (typeof children === 'object' && children.type) {
            //把这个儿子这个虚拟DOM挂载到父节点DOM上
            props.children.mountIndex = 0;
            mount(children, dom)
        } else if (Array.isArray(children)) {
            reconcileChildren(children, dom);
        }
    }
    vdom.dom = dom;//在虚拟DOM挂载或者说放置一个dom属性指向此虚拟DOM对应的真实DOM
    if (ref) ref.current = dom;
    return dom;
}
function mountMemoComponent(vdom) {
    let { type, props } = vdom;//type={$$typeof: REACT_MEMO,compare,type:FunctionCounter}
    let renderVdom = type.type(props);
    vdom.prevProps = props;//记录一下老的属性对象，方便更新的时候进行对比
    vdom.oldRenderVdom = renderVdom;
    if (!renderVdom) return null;
    return createDOM(renderVdom);
}
function mountProviderComponent(vdom) {
    let { type, props } = vdom;//type={$$typeof: REACT_PROVIDER, _context: context}
    let context = type._context;//{ $$typeof: REACT_CONTEXT, _currentValue: undefined }
    context._currentValue = props.value;//把属性中的value值赋给context._currentValue
    let renderVdom = props.children;//Provider而言它要渲染的其实 是它的儿子
    vdom.oldRenderVdom = renderVdom;//这一步是为了后面更新用的 
    if (!renderVdom) return null;
    return createDOM(renderVdom);
}
function mountContextComponent(vdom) {
    let { type, props } = vdom;//type = {$$typeof: REACT_CONTEXT,_context: context}
    let context = type._context;
    let renderVdom = props.children(context._currentValue);
    vdom.oldRenderVdom = renderVdom;
    if (!renderVdom) return null;
    return createDOM(renderVdom);
}
function mountForwardComponent(vdom) {
    let { type, props, ref } = vdom;
    let renderVdom = type.render(props, ref);
    if (!renderVdom) return null;
    return createDOM(renderVdom);
}
function mountClassComponent(vdom) {
    let { type: ClassComponent, props, ref } = vdom;
    //把类组件的属性传递给了类组件的构造函数，
    let classInstance = new ClassComponent(props);//创建类组件的实例
    if (ClassComponent.contextType) {
        //把value值赋给classInstance的context属性
        classInstance.context = ClassComponent.contextType._currentValue;
    }
    vdom.classInstance = classInstance;//在虚拟DOm上挂载一个属性，指向类组件的实例
    if (ref) ref.current = classInstance;
    if (classInstance.componentWillMount) {
        classInstance.componentWillMount();
    }
    //可能是原生组件的虚拟DOM，也可能是类组件的的虚拟DOM，也可能是函数组件的虚拟DOM
    let renderVdom = classInstance.render();
    //在第一次挂载类组件的时候让类实例上添加一个oldRenderVdom=renderVdom
    vdom.oldRenderVdom = classInstance.oldRenderVdom = renderVdom;
    if (!renderVdom) return null;
    let dom = createDOM(renderVdom);//TODO
    if (classInstance.componentDidMount) {
        dom.componentDidMount = classInstance.componentDidMount.bind(classInstance);
    }
    return dom;
}
function mountFunctionComponent(vdom) {
    let { type: functionComponent, props } = vdom;
    let renderVdom = functionComponent(props);//获取组件将要渲染的虚拟DOM
    vdom.oldRenderVdom = renderVdom;
    if (!renderVdom) return null;
    return createDOM(renderVdom);
}
function reconcileChildren(children, parentDOM) {
    children.forEach((childVdom, index) => {
        childVdom.mountIndex = index;
        mount(childVdom, parentDOM)
    });
}
function updateProps(dom, oldProps, newProps) {
    for (let key in newProps) {
        if (key === 'children') {//此处不处理子节点
            continue;
        } else if (key === 'style') {
            let styleObj = newProps[key];
            for (let attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        } else if (/^on[A-Z].*/.test(key)) {///说明是一个事件处理函数
            //dom.onclick = 函数
            //dom[key.toLowerCase()]=newProps[key];
            //以后我们不再把事件函数绑定到对应DOM上的，而是会进行事件委托，全部委托到document上
            addEvent(dom, key.toLowerCase(), newProps[key]);
        } else {
            dom[key] = newProps[key];
        }
    }
    for (let key in oldProps) {
        //如果说一个属性老的属性对象里有，新的属性没有，就需要删除
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}
/**
 * DOM-DIFF 递归的比较 老的虚拟DOM和新的虚拟DOM，找出新旧的差异，然后把这些差异是最小化的操作同步到真实DOM上
 * @param {*} parentDOM 父真实DOM
 * @param {*} oldVdom 老的虚拟DOM
 * @param {*} newVdom 新的虚拟DOM
 * @param {*} nextDOM 你将把新的元素插入到哪个真实DOM之前
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
    //如果老的是null新的也是null 什么都不用干
    if (!oldVdom && !newVdom) {
        return;
        //如果老的有，新的没有，那 就直接删除老节点    
    } else if (oldVdom && !newVdom) {
        unMountVdom(oldVdom);
    } else if (!oldVdom && newVdom) {
        mountVdom(parentDOM, newVdom, nextDOM);
        // 如果老的有，新的也有，那么要判断类型type,如果类型一样，可以复用，如果类型不一样，不能复用
    } else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
        unMountVdom(oldVdom);
        mountVdom(parentDOM, newVdom, nextDOM);
    } else {//如果老的有，新的也有，类型也一样 就可以进行深度的dom-diff并且可复用当前的DOM节点
        updateElement(oldVdom, newVdom);
    }
}
function updateElement(oldVdom, newVdom) {
    //如果新老节点都是文本节点，复用老的文本节点
    if (oldVdom.type.$$typeof === REACT_MEMO) {
        updateMemoComponent(oldVdom, newVdom);
    } else if (oldVdom.type.$$typeof === REACT_CONTEXT) {
        updateContextComponent(oldVdom, newVdom);
    } else if (oldVdom.type.$$typeof === REACT_PROVIDER) {
        updateProviderComponent(oldVdom, newVdom);
    } else if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        currentDOM.textContent = newVdom.props.content;
    } else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = findDOM(oldVdom);
        updateProps(currentDOM, oldVdom.props, newVdom.props);
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
        //如果老的类型是一个函数，说明它是一个类组件或者函数组件    
    } else if (typeof oldVdom.type === 'function') {
        if (oldVdom.type.isReactComponent) {
            newVdom.classInstance = oldVdom.classInstance;
            updateClassComponent(oldVdom, newVdom);
        } else {
            updateFunctionComponent(oldVdom, newVdom);
        }
    }
}
function updateMemoComponent(oldVdom, newVdom) {
    let { type, prevProps } = oldVdom;
    //如果新老属性比较后是不相等的，进入更新逻辑
    if (!type.compare(prevProps, newVdom.props)) {
        let oldDOM = findDOM(oldVdom);//老的真实DOM
        let parentDOM = oldDOM.parentNode;//真实父DOM
        let { type, props } = newVdom;
        let renderVdom = type.type(props);
        compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
        newVdom.prevProps = props;
        newVdom.oldRenderVdom = renderVdom;
    } else {//如果新老属性比较后是相等的，跳过更新，直接赋值
        newVdom.prevProps = prevProps;
        newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
    }
}
function updateProviderComponent(oldVdom, newVdom) {
    let oldDOM = findDOM(oldVdom);//老的真实DOM
    let parentDOM = oldDOM.parentNode;//真实父DOM
    let { type, props } = newVdom;
    let context = type._context;
    context._currentValue = props.value;//这一步很关键，使用新的属性赋给 _currentValue
    let renderVdom = props.children;
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
    newVdom.oldRenderVdom = renderVdom;
}
function updateContextComponent(oldVdom, newVdom) {
    let oldDOM = findDOM(oldVdom);//老的真实DOM
    let parentDOM = oldDOM.parentNode;//真实父DOM
    let { type, props } = newVdom;
    let context = type._context;
    let renderVdom = props.children(context._currentValue);
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
    newVdom.oldRenderVdom = renderVdom;
}

/**
 * 更新类组件
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance;
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps(newVdom.props);
    }
    classInstance.updater.emitUpdate(newVdom.props);
}
/**
 * 更新函数组件 
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
function updateFunctionComponent(oldVdom, newVdom) {
    let parentDOM = findDOM(oldVdom).parentNode;//获取 老的真实DOM的父节点
    let { type, props } = newVdom;
    let newRenderVdom = type(props);//函数组件更新每次都要重新执行函数
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
    newVdom.oldRenderVdom = newRenderVdom
}
function updateChildren(parentDOM, oldVChildren, newVChildren) {
    O
    oldVChildren = (Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]).filter(item => item);
    newVChildren = (Array.isArray(newVChildren) ? newVChildren : [newVChildren]).filter(item => item);
    //1.构建老map key虚拟DOM的key,值虚拟DOM
    let keyedOldMap = {};
    oldVChildren.forEach((oldVChild, index) => {
        let oldKey = oldVChild.key ? oldVChild.key : index;
        keyedOldMap[oldKey] = oldVChild;
    });
    let patch = [];//表示我们要打的补丁，也就是我们要进行的操作
    let lastPlacedIndex = 0;
    newVChildren.forEach((newVChild, index) => {
        newVChild.mountIndex = index;
        let newKey = newVChild.key ? newVChild.key : index;
        let oldVChild = keyedOldMap[newKey];
        if (oldVChild) {//如果说明老节点找到了，可以复用老节点
            //先更新
            updateElement(oldVChild, newVChild);
            if (oldVChild.mountIndex < lastPlacedIndex) {
                patch.push({
                    type: MOVE,
                    oldVChild,//把oldVChild移动互当前的索引处
                    newVChild,
                    mountIndex: index
                });
            }
            delete keyedOldMap[newKey];//从Map中删已经复用好的节点
            lastPlacedIndex = Math.max(oldVChild.mountIndex, lastPlacedIndex);
        } else {
            patch.push({
                type: PLACEMENT,
                newVChild,
                mountIndex: index
            });
        }
    });
    //获取需要移动的元素
    let moveChildren = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);
    //遍历完成后在map留下的元素就是没有被 复用到的元素，需要全部删除
    Object.values(keyedOldMap).concat(moveChildren).forEach(oldVChild => {
        let currentDOM = findDOM(oldVChild);
        parentDOM.removeChild(currentDOM);
    });
    patch.forEach(action => {
        let { type, oldVChild, newVChild, mountIndex } = action;
        let childNodes = parentDOM.childNodes;//真实DOM节点集合
        if (type === PLACEMENT) {
            let newDOM = createDOM(newVChild);//根据新的虚拟DOM创建新的真实DOM
            let childNode = childNodes[mountIndex];//获取 原来老的DOM中的对应的索引处的真实DOM
            if (childNode) {
                parentDOM.insertBefore(newDOM, childNode);
            } else {
                parentDOM.appendChild(newDOM);
            }
        } else if (type === MOVE) {
            let oldDOM = findDOM(oldVChild);
            let childNode = childNodes[mountIndex];//获取 原来老的DOM中的对应的索引处的真实DOM
            if (childNode) {
                parentDOM.insertBefore(oldDOM, childNode);
            } else {
                parentDOM.appendChild(oldDOM);
            }
        }

    })

    /*  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
     for (let i = 0; i < maxLength; i++) {
         //在老的虚拟DOM查找，有老节点，并且老节节真的对应一个真实DOM节点，并且它的索引比我要大
         let nextVdom = oldVChildren.find((item, index) => index > i && item && findDOM(item));
         compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVdom && findDOM(nextVdom));
     } */
}
function mountVdom(parentDOM, vdom, nextDOM) {
    let newDOM = createDOM(vdom);
    if (nextDOM) {
        parentDOM.insertBefore(newDOM, nextDOM);
    } else {
        parentDOM.appendChild(newDOM);
    }
    if (newDOM.componentDidMount) {
        newDOM.componentDidMount();
    }
}
/**
 * 卸载老节点
 * @param {}} vdom 老节点的虚拟DOM
 */
function unMountVdom(vdom) {
    let { props, ref } = vdom;
    let currentDOM = findDOM(vdom);//获取 老的真实DOM
    //如果这个子节点是一个类组件的话，我们还要执行它的卸载的生命周期函数
    if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {
        vdom.classInstance.componentWillUnmount();
    }
    if (ref) {
        ref.current = null;
    }
    //如果有子节点，需要递归删除所有的子节点
    if (props.children) {
        let children = Array.isArray(props.children) ? props.children : [props.children]
        children.forEach(unMountVdom);
    }
    //从父节点中把自己删除
    if (currentDOM) currentDOM.parentNode.removeChild(currentDOM);
}
/**
 * 从虚拟DOM返回真实DOM
 * @param {*} vdom 
 * @returns 
 */
export function findDOM(vdom) {
    if (!vdom) return null;
    if (vdom.dom) {//如果它身上有dom属性，那说明这个vdom是一个原生组件的虚拟DOM。它会有dom属生指向真实DOM，直接返回
        return vdom.dom;;
    } else {
        return findDOM(vdom.oldRenderVdom);
    }
}
const ReactDOM = {
    render,
    createPortal: render
}
export default ReactDOM;