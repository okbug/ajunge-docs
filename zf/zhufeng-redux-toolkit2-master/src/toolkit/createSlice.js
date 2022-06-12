import { createAction, createReducer } from "./";


function createSlice(options){
  const {name,initialState,reducers={},extraReducers={}} = options;
  let actions = {};
  //[add,minus]=> counter/add counter/minus
  let prefixReducers = {};
  Object.keys(reducers).forEach(function (key){
    let type = getType(name,key);// counter/add
    actions[key]=createAction(type);// functon actionCreateor(){return {type:'counter/add'}}
    prefixReducers[type]=reducers[key];
  });
  let reducer = createReducer(initialState,prefixReducers,extraReducers);
  return {
    actions,
    reducer
  }
}
function getType(slice,actionKey){
    return slice+'/'+actionKey;
}
export default createSlice;
/**
 * 其实为了区分 不同分片的动作类型
 * 不同的分片，它的动作可以是一样的
 * name指的是命名空间
 *  functon actionCreateor(){return {type:'counter/add'}}
 */