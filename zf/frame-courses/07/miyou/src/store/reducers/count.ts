export interface ICount {
  count: number,
  type: string
}
interface IAction {
  type: string,
  qqq: number
}
let defalutState: ICount = {
  count: 100,
  type: "偶数"
}
export function CounterReducer(state: ICount = defalutState, action: IAction) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.qqq,
        type: action.qqq % 2 ? '奇数' : "偶数"
      }
    case 'minus':
      return {
        ...state,
        count: state.count - action.qqq,
        type: action.qqq % 2 ? '奇数' : "偶数"
      }
    default:
      return {
        ...state
      }
  }
}