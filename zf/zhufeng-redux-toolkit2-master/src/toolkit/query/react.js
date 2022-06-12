
import {useContext,useLayoutEffect,useReducer} from 'react';
import createSlice from '../createSlice';
import {ReactReduxContext} from 'react-redux';
/**
 * 通过fetch请求后端接口
 * @param {*} url 
 * @returns 响应体
 */
function fetchBaseQuery({baseUrl}){
    return async function(url){
        return await fetch(baseUrl+url).then(res=>res.json());
    }
}

function createApi({reducerPath,baseQuery,endpoints}){
    let slice = createSlice({
        name:reducerPath,
        initialState:{data:null,error:null,isLoading:false},
        reducers:{
            setValue(state,{payload={}}){
                //把payload上的属性全部拷贝到state上，就可以改变state状态了
                for(let key in payload){
                    state[key]= payload[key];
                }
            }
        }
    });
    
    let {reducer,actions:{setValue}} = slice;
    //store.disatch({type:'FETCH_DATA',payload:{url}});
    function middleware({dispatch}){
        return function(next){//调用下一个中间件或dispatch
            return function(action){//改造后新的dispatch方法
                if(action.type === 'FETCH_DATA'){
                    let {url} = action.payload;
                    ;(async function(){
                        try{
                              //请求接口前派发一个动作isLoading=true
                            dispatch(setValue({isLoading:true}));
                            let data = await baseQuery(url);
                            dispatch(setValue({isLoading:false,data}));
                        }catch(error){
                            debugger
                            dispatch(setValue({isLoading:false,error:error.toString()}));
                        }
                    })();
                }else{
                    next(action);
                }
            }
        }
    }
    let builder= {
        query(options){//options.query
            //store.disatch({type:'FETCH_DATA',payload:{url}});
            function useQuery(id){//React自定义Hooks 必须以use开头
                let {store} = useContext(ReactReduxContext);
                let [,forceUpdate] = useReducer(x=>x+1,0);
                useLayoutEffect(()=>{
                    let unsubscribe = store.subscribe(forceUpdate);
                    let url = options.query(id);
                    store.dispatch({
                        type:'FETCH_DATA',
                        payload:{url}
                    });
                    //监控状态的变化，状态发生变化后执行forceUpdate更新组件
                    return unsubscribe;
                },[]);
                return store.getState()[reducerPath];
            }
            return {useQuery};
        }
    }

    //todoApi.endpoints.getTodo.useQuery(1);
    let api = {
        reducerPath,
        reducer,
        middleware,
        endpoints:endpoints(builder)
    }
    return api;
}

export {fetchBaseQuery,createApi}