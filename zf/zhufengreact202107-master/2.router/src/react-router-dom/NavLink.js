import React from 'react'
import {Route,Link} from './';
export default function NavLink(props) {
   const {
       to:path,//点击时要跳转换路径
       className:classNameprop='',
       style:styleProp={},
       activeClassName='active',//激活类名
       activeStyle={},//激活行内样式
       children,//子节点
       exact//是否精确匹配
   } = props;
   return (
    <Route path={path} exact={exact}>
        {
            ({match})=>{
                let className=match?joinClassName(classNameprop,activeClassName):classNameprop;
                let style=match?{...styleProp,...activeStyle}:styleProp;
                let linkProps = {className,style,to:path,children};
                return <Link {...linkProps}/>
            }
        }
    </Route>
   )
}
// joinClassName(basic,active)=> "basic active"
function joinClassName(...classNames){
    return classNames.filter(c=>c).join(' ');
}