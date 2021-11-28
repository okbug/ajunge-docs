import React from 'react'
import ReactReduxContext from './ReactReduxContext';

/**
 * 接收属性中的store,然后通过context传递给下层组件
 * @param {*} props 
 * @returns 
 */
export default function Provider(props) {
    return (
        <ReactReduxContext.Provider value={{ store: props.store }}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}
