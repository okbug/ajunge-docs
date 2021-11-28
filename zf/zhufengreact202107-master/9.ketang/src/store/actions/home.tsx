
import * as actionTypes from '@/store/action-types';
import {getLessons, getSliders} from '@/api/home';
export default {
    setCurrentCategory(newCategory:string){
        return {
            type:actionTypes.SET_CURRENT_CATEGORY,
            payload:newCategory
        }
    },
    getSliders(){
        return {
            type:actionTypes.GET_SLIDERS,
            payload:getSliders()
        }
    },
    getLessons(){
        return function(dispatch:any,getState:any){
            ;(async function(){
                let {currentCategory,lessons:{loading,hasMore,offset,limit}} = getState().home;
                //如果有更多数据，并且当前不处于加载中的话
                if(hasMore&&!loading){
                    dispatch({type:actionTypes.SET_LESSON_LOADING,payload:true});
                    let result = await getLessons(currentCategory,offset,limit);
                    dispatch({type:actionTypes.SET_LESSONS,payload:result.data});
                }
            })();
        }
    },
    refreshLessons(){
        return function(dispatch:any,getState:any){
            ;(async function(){
                let {currentCategory,lessons:{loading,limit}} = getState().home;
                //如果有更多数据，并且当前不处于加载中的话
                if(!loading){
                    dispatch({type:actionTypes.SET_LESSON_LOADING,payload:true});
                    let result = await getLessons(currentCategory,0,limit);
                    dispatch({type:actionTypes.REFRESH_LESSONS,payload:result.data});
                }
            })();
        }
    }
}