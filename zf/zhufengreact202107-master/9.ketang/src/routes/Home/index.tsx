import React,{PropsWithChildren,useEffect,useRef} from 'react'
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {CombinedState} from '@/store/reducers';
import { HomeState } from '@/store/reducers/home';
import HomeHeader from './components/HomeHeader';
import HomeSliders from './components/HomeSliders';
import LessonList from './components/LessonList';
import actions from '@/store/actions/home';
import {Spin} from 'antd';
import './index.less';
import {loadMore,downRefresh} from '@/utils';
type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params{}
type Props = PropsWithChildren<RouteComponentProps<Params>&StateProps&DispatchProps>

function Home(props:Props) {
    let homeContainerRef = useRef(null);
    useEffect(()=>{
        loadMore(homeContainerRef.current,props.getLessons);//上拉加载
        downRefresh(homeContainerRef.current,props.refreshLessons);//下拉刷新
    },[]);
    return (
        <>
            {props.lessons.loading&&<Spin size="large"/>}
            <HomeHeader 
              currentCategory={props.currentCategory}
              setCurrentCategory={props.setCurrentCategory}
              refreshLessons={props.refreshLessons}
              homeContainerRef={homeContainerRef}
            />
            <div className="home-container" ref={homeContainerRef}>
              <HomeSliders sliders={props.sliders} getSliders={props.getSliders}/>
              <LessonList lessons={props.lessons} getLessons={props.getLessons}/>
            </div>
        </>
    )
}
function mapStateToProps(state:CombinedState):HomeState{
    return state.home;
}
export default connect(
    mapStateToProps,
    actions
)(Home);