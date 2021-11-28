import {useContext} from 'react';
import { bindActionCreators } from 'redux';
import ReactReduxContext from "../ReactReduxContext";

function useBoundDispatch(actions){
    const {store} = useContext(ReactReduxContext);
    return bindActionCreators(actions,store.dispatch);
}
export default useBoundDispatch;