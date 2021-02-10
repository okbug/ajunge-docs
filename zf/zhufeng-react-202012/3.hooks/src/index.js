import React from 'react';
import ReactDOM from 'react-dom';
//自定义hooks.只要说一个函数以use开头，并且里面调用了别的hooks，
function useRequest(url){
  let limit = 5;//每页的条数
  let [offset,setOffset] = React.useState(0);//偏移量   0,5 5,5
  let [data,setData] = React.useState([]);//真实的用户列表数据
  function loadMore(){
    //loadMore进去就set null了， 第二次loadMore的时候 第一次的结果就没了吧 data的结果永远都是5条
    setData(null);
    fetch(`${url}?offset=${offset}&limit=${limit}`)
      .then(res=>res.json())//[user1,user2,user3,user4,user5]
      .then(pageData=>{
        debugger
        setData([...data,...pageData]);//[user1,user2,user3,user4,user5]
        setOffset(offset+pageData.length);//5
      })
  }
  //第一次渲染的时候，先调用一次loadMore加载第一页
  //只要你把一个函数放在了 useEffect里，那么肯定会在当前的组件渲染后执行
  React.useEffect(loadMore,[]);
  return [data,loadMore];
}
function App(){
  const [users,loadMore]=useRequest('http://localhost:8000/api/users');
  if(users === null){
    return <div>加载中.......</div>
  }
  return (
    <div>
      <ul>
      {
        users.map((user)=><li key={user.id}>{user.id}:{user.name}</li>)
      }
     </ul>
     <button onClick={loadMore}>加载更多</button>
    </div>
  )
}
ReactDOM.render(<App/>,document.getElementById('root'));

/**
 * 开心麻花
loadMore怎么会先执行一次 
开心麻花
没有调用呢 
毕会斌
setState(null)是为了显示loading吧 
Tony
调用了useRequest 
Tony
里边有useEffect 
Tony
会在第一次渲染调用loadmore 
安凯凯
loadMore进去就set null了， 第二次loadMore的时候 第一次的结果就没了吧 data的结果永远都是5条 
开心麻花
useEffect 也不会调用loadMore 
咋不会。。 
Tony
第一次渲染完就会调用useeffect的东西啊 
类组件render函数里 如果打印了文字 那么打印次数应该和渲染次数是一样的吧 
学习
Fetch结果里还有...data,data是null会报错吧 
开心麻花
为null了 
学习
对 
学习
看我上面发的 
学习
为啥...null不报错 
张润钊-2625
为null是为了节约内存。。 
也不是异步的吧 
程云
下面合并了？ 
Tony
和this.setstate一样？ 
f
微任务宏任务吗 
毕会斌
闭包是吧 
Tony
哦哦。。setData是同步更新的 这个是闭包拿到的 
Vc撤回了一条消息
Vc撤回了一条消息
学习
打印一下data和users 
开心麻花
每次更新都重新执行了React.useEffect 不会多次userEffect吗？ 
学习
每次改变count，函数counter重新整体执行一次？ j r 

mirrorx是封装了一层redux吧 
学习
路由还有个懒加载 
http://www.javascriptpeixun.cn/goods/show/5?targetId=12&preview=0
课时 287 : 1.React性能优化
月下吴刚
mobx 讲不？ 
古德猫宁
我们这用的mobx 
有实战和实现源码的视频
学习
既然route里会计算match，为什么还要router初始化match？ 
Vc
切换路由生命周期的执行 有录播么 
Tony
保重！ 
月下吴刚
从零开始 renact 源码那个课要买才能进 

 */