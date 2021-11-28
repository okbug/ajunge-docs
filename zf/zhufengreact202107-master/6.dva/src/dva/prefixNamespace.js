import {NAMESPACE_SEP} from './constants';
/**
 * 把一个对象的key从一个老的值变成 namespace/老的值
 * @param {*} obj 
 * @param {*} namespace 
 */
function prefix(obj,namespace){
    //[add,minus]
    return Object.keys(obj).reduce(function(memo,key){
        const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
        memo[newKey]=obj[key];
        return memo;
    },{});
}

export default function prefixNamespace(model){
    if(model.reducers){
        model.reducers=prefix(model.reducers,model.namespace);
    }
    if(model.effects){
        model.effects=prefix(model.effects,model.namespace);
    }
    return model;
}