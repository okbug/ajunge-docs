import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Switch extends React.Component{
    static contextType = RouterContext
    render(){
        const {location} = this.context;
        let element,match;
        //this.props.children可以是undefined可以是对象，也可能是数组，也可能是字符串或者 数字，
        React.Children.forEach(this.props.children,child=>{
            if(!match&&React.isValidElement(child)){//如何还没有任何一个元素匹配上
                element=child;
                match = matchPath(location.pathname,child.props);
            }//如果但凡一有个匹配上的，后面都不走都跳过，只要匹配上的第1个儿子就可以了
        });
        /*         
        let children = (Array.isArray(this.props.children)?this.props.children:[this.props.children]);
        for(let i=0;i<this.props.children.length;i++){
            let child = this.props.children[i];
            if(React.isValidElement(child)){
                element=child;
                match = matchPath(location.pathname,child.props);
                if(match)break;
            }
        } */
        return match?React.cloneElement(element,{computedMatch:match}):null;
    }
}

export default Switch;
/**
child  是Route转换后的vdom 吧 {type:Route}
古德猫宁
那这个也是每个route都会判断 循环的长度没变 性能优化了吗 
 */