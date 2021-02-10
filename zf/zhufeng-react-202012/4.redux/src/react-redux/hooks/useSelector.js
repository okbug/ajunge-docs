import React from 'react';
import ReactReduxContext from '../ReactReduxContext';
function useSelector(selector) {
    const { store } = React.useContext(ReactReduxContext);
    let state = store.getState();//获取总状态
    let selectedState = selector(state);//获取分状态
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => {
        return store.subscribe(forceUpdate);
    });
    return selectedState;
}
export default useSelector;
/**
 * 要返回state里面的多个数据，就不能state=>state.count1这样简写了吧 
 */