import React, { useState, CSSProperties } from 'react'
import { BarsOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Transition } from 'react-transition-group'
import logo from '@/images/logo.png'
import './index.less';
//mport styles from './index.less';
const duration = 1000;
interface Props {
    currentCategory: string;
    setCurrentCategory: (newCategory: string) => any,
    refreshLessons: () => any
    homeContainerRef:any
}
interface TransitionStyles {
    entering: CSSProperties,
    entered: CSSProperties,
    exiting: CSSProperties,
    exited: CSSProperties
}
const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },//进入中
    entered: { opacity: 1 },//进入成功后
    exiting: { opacity: 0 },//退出中
    exited: { opacity: 0 },//退出成功后
}
const defaultStyle = {
    opacity: 0,
    transition: `opacity ${duration}ms ease-in-out`
}
function HomeHeader(props: Props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const handleCategoryChange = (event:React.MouseEvent<HTMLUListElement>)=>{
        let target:HTMLLIElement = event.target as HTMLLIElement;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
        setIsMenuVisible(false);
        props.refreshLessons();
        props.homeContainerRef.current.scrollTop=0;
    }
    return (
        <header className='home-header'>
            <div className="logo-header">
                <img src={logo} />
                <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state:keyof TransitionStyles) => (
                        <ul className="category"
                          onClick={handleCategoryChange}
                          style={{
                              ...defaultStyle,
                              ...transitionStyles[state]
                          }}
                        >
                            <li data-category="all" className={classnames({
                                active:props.currentCategory === 'all'
                            })}>全部</li>
                            <li data-category="react" className={classnames({
                                active:props.currentCategory === 'react'
                            })}>React</li>
                            <li data-category="vue" className={classnames({
                                active:props.currentCategory === 'vue'
                            })}>Vue</li>
                        </ul>
                    )
                }
            </Transition>
        </header>
    )
}

export default HomeHeader;