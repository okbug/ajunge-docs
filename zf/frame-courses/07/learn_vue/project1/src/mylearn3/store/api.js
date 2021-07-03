import store from './index'
import { ADDCOUNT } from './types'
export function add(n) {
  store.commit(ADDCOUNT, n)
}