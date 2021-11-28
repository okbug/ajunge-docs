
import React from 'react';
import ReactReduxContext from '../ReactReduxContext';
import { bindActionCreators } from '../../redux';
function useBoundDispatch(actionCreators) {
    const { store } = React.useContext(ReactReduxContext);
    return bindActionCreators(actionCreators, store.dispatch);
}
export default useBoundDispatch;