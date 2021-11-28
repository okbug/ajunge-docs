let { produce } = require('immer');
let baseState = {}

let nextState = produce(baseState, (draft) => {

})
console.log(baseState === nextState);