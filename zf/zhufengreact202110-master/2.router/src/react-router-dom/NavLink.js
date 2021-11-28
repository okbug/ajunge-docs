import React from 'react'
import { Route, Link } from '../react-router-dom';
export default function NavLink(props) {
    //访问谁?或者点击谁，哪个Link就被激活，核心原理就是地址栏中的location.pathname和 to一致
    const {
        to,//是要跳转的路径
        exact,//是否是精确匹配
        className = '',//类名
        activeClassName = 'active',//激活类名
        style = {},//行内样式对象
        activeStyle = {},//活动样式对象
        children
    } = props;
    return (
        <Route path={to} exact={exact} >
            {
                ({ match }) => {
                    let linkProps = {
                        className: match ? `${className} ${activeClassName}` : className,
                        style: match ? { ...style, ...activeStyle } : style,
                        to,
                        children
                    }
                    console.log(linkProps);
                    return <Link {...linkProps} />
                }
            }
        </Route>
    )
}
