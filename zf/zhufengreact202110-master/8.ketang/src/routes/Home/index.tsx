
import React, { PropsWithChildren, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { CombinedState } from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import actionCreators from '@/store/actionCreators/home';
import { RouteComponentProps } from 'react-router-dom';
import HomeHeader from './components/HomeHeader';
import HomeSliders from './components/HomeSliders';
import LessonList from './components/LessonList';
import { loadMore, downRefresh, throttle } from '@/utils';
import { Spin } from 'antd';
import './index.less'
type DispatchProps = typeof actionCreators;//把actionCreators映射为属性对象
type StateProps = ReturnType<typeof mapStateToProps>//把mapStateToProps返回值类型映射为属性对象
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & DispatchProps & StateProps>;
function Home(props: Props) {
    let homeContainerRef = useRef(null);
    let lessonListRef = useRef(null);
    useEffect(() => {
        loadMore(homeContainerRef.current, props.getLessons);
        downRefresh(homeContainerRef.current, props.refreshLessons);
        let fn = throttle(lessonListRef.current, 20);
        homeContainerRef.current.addEventListener('scroll', fn);
        homeContainerRef.current.addEventListener('scroll', () => {
            sessionStorage.setItem('scrollTop', homeContainerRef.current.scrollTop);
        });
    }, []);
    useEffect(() => {
        let scrollTop = sessionStorage.getItem('scrollTop');
        if (scrollTop) {
            homeContainerRef.current.scrollTop = scrollTop;//此处不能加px
        }
    });
    return (
        <>
            <Spin size={"large"} />
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
            <div className="home-container" ref={homeContainerRef}>
                <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
                <LessonList
                    lessons={props.lessons}
                    getLessons={props.getLessons}
                    homeContainerRef={homeContainerRef}
                    ref={lessonListRef}
                />
            </div>
        </>
    )
}
function mapStateToProps(state: CombinedState): HomeState {
    return state.home;
}
export default connect(mapStateToProps, actionCreators)(Home);