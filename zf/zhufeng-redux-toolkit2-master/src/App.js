
import todoApi from './todos';
//import {useGetTodoQuery} from './todos';
function App(){
  //const {isLoading,data,error} = useGetTodoQuery(1);
  const {isLoading,data,error} = todoApi.endpoints.getTodo.useQuery(1);
  console.log('isLoading=',isLoading,'data=',data,'error=',error);
  if(isLoading){
    return <div>加载中......</div>
  }else if(data){
    return <div>数据加载正常 {data.text}</div>
  }else if(error){
    return <div>数据加载错误 {error.error}</div>
  }else{
      return null;
  }
}
export default App;