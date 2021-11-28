import React from 'react'
import { __RouterContext as RouterContext } from '../react-router';
export default function Link(props) {
    return (
        <RouterContext.Consumer>
            {
                (value) => {
                    return (
                        <a
                            {...props}
                            onClick={(event) => {
                                event.preventDefault();
                                value.history.push(props.to);
                            }}
                        >{props.children}</a>
                    )
                }
            }
        </RouterContext.Consumer>
    )
}
