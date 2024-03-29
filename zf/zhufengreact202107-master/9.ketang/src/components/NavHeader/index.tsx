import React,{PropsWithChildren} from 'react'
import {LeftOutlined} from '@ant-design/icons';
import {History} from 'history';
import './index.less';
type Props = PropsWithChildren<{
    history:History
}>;
export default function NavHeader(props:Props) {
    return (
        <div className="nav-header">
            <LeftOutlined onClick={()=>props.history.goBack()}/>
            {props.children}
        </div>
    )
}
