
import { REACT_ELEMENT, REACT_FORWARD_REF, REACT_CONTEXT, REACT_PROVIDER, REACT_MEMO } from './constants';
import { wrapToVdom, shallowEqual } from './utils';
import { Component } from './component';
import { useState, useMemo, useCallback, useReducer, useEffect, useLayoutEffect } from './react-dom';
//https://github1s.com/facebook/react/blob/HEAD/packages/react/src/ReactElement.js#L427-L433
function createElement(type, config, children) {//children永远都是数组
    let ref, key;
    if (config) {
        delete config.__source;
        delete config.__self;
        ref = config.ref;//后面会讲用来引用这个真实DOM元素
        key = config.key;//后面会讲是用来进行DOM-DIFF优化的，是用来唯一标识某个子元素的
        delete config.ref;
        delete config.key;
    }
    let props = { ...config };
    if (arguments.length > 3) {//如果参数的长度大于3，说明有多个儿子
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else if (arguments.length === 3) {
        props.children = wrapToVdom(children);//字符串 数字 React元素
    }
    return {//这就是虚拟DOM，也就是React元素
        $$typeof: REACT_ELEMENT,//指的是元素的类型 现在没有什么作用
        type,//dom标签的类型 h1 h2 span div
        ref,
        key,
        props//className style children
    }

}
function createRef() {
    return { current: null };
}
/**
 * 
 * @param {*} render 就是一个可以接收转发的ref的函数组件
 */
function forwardRef(render) {
    return {
        $$typeof: REACT_FORWARD_REF,
        render
    }
}
function createContext() {
    let context = { $$typeof: REACT_CONTEXT, _currentValue: undefined };
    context.Provider = {
        $$typeof: REACT_PROVIDER,
        _context: context
    }
    context.Consumer = {
        $$typeof: REACT_CONTEXT,
        _context: context
    }
    return context;
}
function cloneElement(oldElement, props, children) {
    if (arguments.length > 3) {//如果参数的长度大于3，说明有多个儿子
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else if (arguments.length === 3) {
        props.children = wrapToVdom(children);//字符串 数字 React元素
    }
    return { ...oldElement, props };
}
class PureComponent extends Component {
    //https://github1s.com/facebook/react/blob/HEAD/packages/react-reconciler/src/ReactFiberClassComponent.new.js#L308-L314
    shouldComponentUpdate(nextProps, nextState) {
        //如果属性不相等或者说状态不相等就返回true
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    }
}
function memo(type, compare = shallowEqual) {
    return {
        $$typeof: REACT_MEMO,
        compare,//用来比较 新旧属性差异 判断新属性和老属性是否相同
        type
    }
}
function useContext(context) {
    return context._currentValue;
}
function useRef() {
    return { current: null };
}
function useImperativeHandle(ref, factory) {
    ref.current = factory();
}
const React = {
    createElement,
    Component,
    createRef,
    forwardRef,
    createContext,
    cloneElement,
    PureComponent,
    memo,
    useState,
    useMemo,
    useCallback,
    useReducer,
    useContext,
    useEffect,
    useRef,
    useLayoutEffect,
    useImperativeHandle
}
export default React;
/**
 * React.memo
 * {
 *  $$typeof: Symbol(react.memo)
    compare: null
    type:  FunctionCounter
   }
 */
/**
let context  = {
    $$typeof: Symbol(react.context),
    Consumer: {$$typeof: Symbol(react.context), _context:context}
    Provider: {$$typeof: Symbol(react.provider), _context:context},
    _currentValue:{color:'red',changeColor}
}
context.Consumer._context=context;
context.Provider._context=context;
 */