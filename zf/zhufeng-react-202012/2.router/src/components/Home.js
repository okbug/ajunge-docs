const Home = (props)=>{
    console.log("Home",props);
    return (
        <div>
            Home
            <button onClick={()=>props.history.push('/user',{name:'用户管理'})}>跳到/user</button>
            <button onClick={()=>props.history.push({pathname:'/user',state:{name:'用户管理'}})}>跳到/user</button>
        </div>
    )
}
export default Home;
/**
 * 17以前
 * React.createElement('div);
 * 17以后
 * require('react/jsx-runtime')('div');
 */