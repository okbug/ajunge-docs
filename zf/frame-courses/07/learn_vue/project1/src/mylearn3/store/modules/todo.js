import { ADDTODO, REMOVETODO } from '../types'
export default {
  // 这个模块完全独立， 更改数据或者调用方法 不会对外界造成影响 或者说 外界的执行不会对这个模块造成影响

  namespaced: true,
  state: {
    todoList: [{ id: 1, val: 'hello' }]
  },
  mutations: {
    [ADDTODO](state, option) {
      state.todoList.push(option)
    },
    [REMOVETODO](state, id) {
      state.todoList = state.todoList.filter(item => item.id != id)
    }
  },
  actions: {
    [ADDTODO](store, option) {
      setTimeout(() => {
        store.commit(ADDTODO, option)
      }, 30);
    },
    [REMOVETODO]({ commit }, id) {
      setTimeout(() => {
        commit(REMOVETODO, id)
      }, 40);
    }
  }
}