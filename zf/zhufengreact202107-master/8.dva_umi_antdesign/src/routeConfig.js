
import IndexPage from "./routes/IndexPage";
import Home from "./routes/Home";
import User from "./routes/User";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
//路由配置
export default [
    {
        path:'/',
        component:IndexPage,
        routes:[
            {
                path:'/home',
                exact:true,
                redirect:true,
                component:Home
            },
            {
                path:'/user',
                component:User,
                /* routes:[
                    {path:'/user/list',component:UserList},
                    {path:'/user/add',component:UserAdd}
                ] */
            },
            {
                path:'/profile',
                component:Profile
            },
            {
                path:'/login',
                component:Login
            },
            {
                path:'/register',
                component:Register
            },
        ]
    }
]