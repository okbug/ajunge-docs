
// 1.功能是遍历对象
export const forEachValue = (obj,callback) =>{
    Object.keys(obj).forEach(key=>callback(obj[key],key));
}
