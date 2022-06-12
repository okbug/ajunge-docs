let produce = require('immer').default;
//老状态其实是不可变的
let baseState = {
    ids:[1,2],
    point:{
        x:100,
        y:100
    }
}
/**
 * baseState 旧状态 
 * draft就是根据老状态生成的草稿状态对象，
 */
let nextState = produce(baseState,(draft)=>{
    draft.ids.push(3);
});
console.log(baseState.ids === nextState.ids);
console.log(baseState.point === nextState.point);