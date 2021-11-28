import {push} from '../../connected-react-router';
const actions =  {
  goto(path){
    return push(path);
  }
}
export default actions;
/**
 * 不要在这里引入history.js
 * 1.麻烦 代码冗余
 * 2.跳转路径只是其中的一项工作，除此之外还有很多数据同步的工作要做
 */