
import {LOCATION_CHANGE} from './action-types';
//引入connectRouter 然后此reducer能够识别这种action，把这个action里面对应的路径信息，保存到store里 store.getState().router.location
function connectRouter(history){
    const initialState = {
        location:history.location,
        action:history.action
    }
    return function(state=initialState,action){
        if(action.type === LOCATION_CHANGE){
            return {...state,...action.payload};
        }else{
            return state;
        }
    }
}
export default connectRouter;