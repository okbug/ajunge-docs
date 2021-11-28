import React from 'react'
import RouterContext from './RouterContext';
import Lifecycle from './Lifecycle';
/**
 * 
 * @returns 要想跳转路径需要调用history.push
 */
export default function Redirect(props) {
    return (
        <RouterContext.Consumer>
            {
                (value) => {
                    return (
                        <Lifecycle onMount={() => value.history.push(props.to)} />
                    );
                }
            }
        </RouterContext.Consumer>
    )
}
