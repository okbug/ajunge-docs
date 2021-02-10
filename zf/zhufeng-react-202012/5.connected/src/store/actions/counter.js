import * as types from '../action-types';
import {push} from '../../connected-react-router';
const actions = {
    add(){
        return {type:types.ADD}
    },
    go(targetPath){
      //this.props.history.push(targetPath); 这个文件里没有history的
      //dispatch(push(targetPath));
      return push(targetPath);
    }
}
export default actions;