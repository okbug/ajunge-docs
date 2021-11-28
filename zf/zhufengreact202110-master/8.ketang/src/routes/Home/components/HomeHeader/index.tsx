import React, { useState, CSSProperties } from 'react'
import logo from '@/assets/images/logo.png';
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import './index.less';
const duration = 1000;//动画的持续的时间
const defaultStyle = {
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`
}
interface TransitionStyles {
    entering: CSSProperties;//进入时的样式
    entered: CSSProperties;//进入成功时的样式
    exiting: CSSProperties;//退出时的样式
    exited: CSSProperties;//退出成功后
}
const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },//进入时的样式
    entered: { opacity: 1 },//进入成功时的样式
    exiting: { opacity: 0 },//退出时的样式
    exited: { opacity: 0 },//退出成功后
}
interface Props {
    currentCategory: string;//当前的分类
    setCurrentCategory: (currentCategory: string) => any //修改当前分类
}
//const logo = 'https://img.zhufengpeixun.com/logo.png';
function HomeHeader(props: Props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {//currentTarget
        let target: HTMLLIElement = event.target as HTMLLIElement;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
        setIsMenuVisible(false);
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition
                in={isMenuVisible}
                timeout={duration}
            >
                {
                    (state: keyof TransitionStyles) => {
                        console.log(state);
                        return (
                            <ul
                                className="category"
                                onClick={setCurrentCategory}
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                            >
                                <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })} >全部</li>
                                <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React</li>
                                <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue</li>
                            </ul>
                        )
                    }
                }
            </Transition>

        </header>
    )
}

export default HomeHeader;