let { produce } = require('immer');
let baseState = {
    ids: [1, 2, 3],
    pos: {
        x: 1,
        y: 1
    }
};
/**
 * 对draftState的修改会反应到nextState上
 * 而immer数据结构是共享的，nextState会和 baseState共享 未修改的部分
 */
let nextState = produce(baseState, (draft) => {
    draft.ids.push(4);
});
console.log(baseState === nextState);
console.log(baseState.pos === nextState.pos);