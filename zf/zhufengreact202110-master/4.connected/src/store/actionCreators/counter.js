import * as actionTypes from '../action-types';
import { push } from '../../connected-react-router';
const actionCreators = {
    add() {
        return { type: actionTypes.ADD };
    },
    minus() {
        return { type: actionTypes.MINUS };
    },
    goto(path) {
        //push本质上是一个actionCreator
        //仓库里有一个中间件，可以拦截这种action,然后进行路径的跳转
        debugger
        return push(path);
    }
    //this.props.history.push('/')
}
export default actionCreators;