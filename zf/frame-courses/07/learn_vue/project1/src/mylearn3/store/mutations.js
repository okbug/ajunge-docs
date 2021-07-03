import { ADDCOUNT } from './types'
export default {
  [ADDCOUNT](state, option) {
    state.count += option
  }
}