/**
 * saga里采用generator函数来yield effect对象
 */
function put(action){
      return {type:"PUT",action};  
}
function * gen(){
    //yield put({type:"ADD"});
     yield {type:"PUT",action:{type:"ADD"}};
     yield new Promise((resolve,reject)=>setTimeout(resolve,1000));
     yield {type:"PUT",action:{type:"MINUS"}};
}
function run(gen){
    let it = gen();
    function next(){
        let {done,value:effect} = it.next();
        console.log(effect);
        //effect.type PUT TAKE
        if(value instanceof Promise){
            value.then(()=>{
                if(!done){
                    next();
                }
            });
        }else{
            if(!done){
                next();
            }
        }
       
    }
    next();
}
run(gen);

/* 
///saga中的co库
let it = gen();
let {value} = it.next();
if(value.type === 'PUT'){
    //派发一个动作value.action  store.dispatch(value.action);
}
let {value} = it.next();
if(value.type === 'PUT'){
    //派发一个动作value.action  store.dispatch(value.action);
}
 */


