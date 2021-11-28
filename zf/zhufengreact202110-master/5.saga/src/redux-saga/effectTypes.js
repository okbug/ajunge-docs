//监听某个动作
export const TAKE = 'TAKE';
//用来派发某个动作
export const PUT = 'PUT';
//用来产出一个新的任务
export const FORK = 'FORK';
//告诉中间件请帮我调用一个方法,此方法一定会返回一个promise,然后会等promise完成，继续向下执行saga
export const CALL = 'CALL';
export const CPS = 'CPS';
export const ALL = 'ALL';
export const CANCEL = 'CANCEL';