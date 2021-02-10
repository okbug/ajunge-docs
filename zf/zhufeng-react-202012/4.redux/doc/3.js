let dispatch;
let middlewareAPI= {
    dispatch:(action)=>dispatch(action)
}
dispatch = (action)=>{console.log(action);}
console.log(middlewareAPI.dispatch);
middlewareAPI.dispatch({type:'ADD'});
