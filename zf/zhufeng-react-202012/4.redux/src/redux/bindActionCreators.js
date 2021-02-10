
/**
 * 
 * @param {*} actionCreator 老的 add方法
 * @param {*} dispatch store.dispatch
 */
function bindActionCreator(actionCreator,dispatch){
   let boundActionCreator =  function(...args){//args=[event]
       //谁调用这个boundActionCreator方法，this就指向谁
       let action = actionCreator.apply(this,args);
       dispatch(action);
   }
   return boundActionCreator;
}
/**
 * 绑定action创建者和store.dispatch方法
 * @param {*} actionCreators  const actions = {add,minus};
 * @param {*} dispatch 
 * boundActionCreators={add,minus}
 */
function bindActionCreators(actionCreators,dispatch){
    const boundActionCreators = {};
    for(const key in actionCreators)    {
        const actionCreator = actionCreators[key];//add或者minus函数
        boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);
    }
    return boundActionCreators;
}
export default bindActionCreators;