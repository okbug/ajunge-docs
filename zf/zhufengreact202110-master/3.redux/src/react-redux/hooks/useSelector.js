
import React from 'react';
import ReactReduxContext from '../ReactReduxContext';
import shallowEqual from '../shallowEqual'

function useSelector(selector, equal = shallowEqual) {
    const { store } = React.useContext(ReactReduxContext);
    let state = store.getState();//{counter1:{number:0},counter2:{number:0}}
    let lastSelectedState = React.useRef();
    let selectedState = selector(state);//{number:0}
    // function(x)=>x+1
    let [, forceUpdate] = React.useReducer(x => x + 1, 0);
    React.useLayoutEffect(() => {
        store.subscribe(() => {
            let selectedState = selector(store.getState());
            if (!equal(selectedState, lastSelectedState.current)) {
                forceUpdate();
            }
            lastSelectedState.current = selectedState;//TODO
        });
    }, [equal, selector, store]);
    return selectedState;
}
export default useSelector;