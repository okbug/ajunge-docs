
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

function connectRouter(history){
    //可把路径信息同步到仓库中，同步两个字段locatio naction
    let initialState = {
        location:history.location,
        action:history.action
    }
    return function(state=initialState,{type,payload}){
        //需要监听路径的变化，当路径发生变化后就可以派发LOCATION_CHANGE动作
        if(type === LOCATION_CHANGE){
            const {location,action} = payload;
            return {...state,location,action};
        }
        return state;
    }
}
export default connectRouter;