//先定义一个动作类型
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
//actionCreator 动作的创建者
function push(path){
    return {
        type:CALL_HISTORY_METHOD,
        payload:{//迭代的数据 history.push(path)
            method:'push',
            path
        }
    }
}
export default push;