//import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {createApi} from './toolkit/query/react';
import axios from 'axios'
axios.interceptors.response.use(function(response){
    return Promise.resolve({data:response.data});
},function(error){
    return Promise.reject({error:{error:error.message}});
});
//判断成功失败有两种策略
//1.成功 200 失败 非200 4xx 5xx
//2.响应都是200 ，在响应里加一个标识符 {success:true} {success:false}
const axiosBaseQuery = ({baseUrl})=>(
 async (url)=>{
    try{
        let result = await axios({url:baseUrl+url});
        console.log('result',result);
        return result;
    }catch(error){
        console.log('error',error);
        throw error;
    }
 }
)
const todoApi = createApi({
    reducerPath:'todosApi',//reducer路径
    baseQuery:axiosBaseQuery({baseUrl:'http://localhost:8080'}),//查询的方法fetch
    endpoints:(builder)=>({//定义一些接口
        getTodo:builder.query({query:(id)=>`/todos/detail/${id}`}),
        getTodos:builder.query({query:(id)=>`/todos/list`})
    })
});
//useGetTodoQuery  = useGetTodoQuery
//todoApi.reduerPath reduer的key
//todoApi.reducer 处理器，定义默认状态，修改状态
//todoApi.middleware 发请求，派发动作
//endpoints => 自定义Hook
export default todoApi;