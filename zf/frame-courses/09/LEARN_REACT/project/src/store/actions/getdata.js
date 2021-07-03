import { hot_getDate } from '../../api'
export function getHotData(params) {
  return () => {
    return hot_getDate(params)
  }
}