

import React from 'react'
import RouterContext from './RouterContext';
//函数组件
export default function Prompt(props) {
    let value = React.useContext(RouterContext);
    React.useLayoutEffect(() => {
        if (props.when)
            return value.history.block(props.message);
    }, [props.message, props.when, value.history]);
    return null;
}

/**
 * 为了方便对比
 * 我们写三种实现
 * 1. 函数组件
 * 2. 类组件
 * 3. 源码里的原版写法
 *
 * useEffect 会在渲染后执行
 * useLayoutEffect会在渲染前执行
 */