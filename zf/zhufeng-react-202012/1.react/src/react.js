import {Component,PureComponent} from './Component';
import {useState,useMemo,useCallback,useReducer,useEffect,useLayoutEffect,useRef} from './react-dom';
import {wrapToVdom} from './utils';
/**
 * @param {*} type 元素的类型
 * @param {*} config 配置对象
 * @param {*} children  儿子或儿子们
 */
function createElement(type,config,children){
    let ref;
    let key;
    if(config){
        delete config.__source;
        delete config.__self;
        ref = config.ref;
        delete config.ref;
        key = config.key;
        delete config.key;
    }
   let props = {...config};
   if(arguments.length>3){
       props.children=Array.prototype.slice.call(arguments,2).map(wrapToVdom);
   }else{
        props.children=wrapToVdom(children);
   }
   return {
       type,
       ref,
       key,
       props
   }
}
function  cloneElement(oldElement,newProps,...newChildren) {
    let children = oldElement.props.children;
    //有可能是一个undefined,一个对象，是一个数组
    if(children){
        if(!Array.isArray(children)){//如果一个儿子，独生子 
            children=[children]
        }
    }else{
        children=[];
    }
    children.push(...newChildren);
    children=children.map(wrapToVdom);
    if(children.length===0){
        children=undefined;
    }else if(children.length===1){
        children=children[0];
    }
    newProps.children = children;
    let props ={...oldElement.props,...newProps};
    //oldElement type key ref props....
    return {...oldElement,props};
}
function createRef(){
    return {current:null};
}
function createContext(initialValue={}){
  let context = {Provider,Consumer};
  function Provider(props){
     context._currentValue = context._currentValue||initialValue;
     Object.assign(context._currentValue,props.value);
     return props.children;
  }
  function Consumer(props){
    return props.children(context._currentValue);
  }
  return context;
}
function memo(FunctionComponent){
  return class extends PureComponent{
      render(){
          return FunctionComponent(this.props);
      }
  }
}

function useContext(context){
 return context._currentValue;
}
function forwardRef(FunctionComponent){
    return class extends Component{
        render(){//this好像类的实例
            if(FunctionComponent.length<2){
                console.error(`forwardRef render functions accept exactly two parameters: props and ref. Did you forget to use the ref parameter?`);
            }
            return FunctionComponent(this.props,this.ref);
        }
    }
}
function useImperativeHandle(ref,factory){
    ref.current = factory();
}
const React = {
    createElement,
    Component,
    PureComponent,
    createRef,
    createContext,
    cloneElement,
    useState,
    memo,
    useMemo,
    useCallback,
    useReducer,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    forwardRef,
    useImperativeHandle
}
export default React;
/**
这里oldE是一个vdom吗？ 
136****2778
第一个形参oldElement是一个vdom吗？ 
f
最后props也需要展开吧 
136****2778
第一个形参oldElement是一个vdom吗？ 

chidren这里合并又拆开 感觉有点冗余 
Tony
父子函数的那个调用顺序是什么来着 
子组件方法里调用父组件的方法
漂
oldEle为什么要展开 
学习
格式和原来保持一致，产生新的vdom 
漂
嗯额 


 */