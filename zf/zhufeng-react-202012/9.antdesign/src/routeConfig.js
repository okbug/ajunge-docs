/* 
import IndexPage from './routes/IndexPage';
import Home from './routes/Home';
import User from './routes/User';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Login from './routes/Login';
每个组件一般来说会对应一个页面
每个页面都会有自己的组件代码
每个组件都会自己的模型 model state namespace reducers effects subscribes

*/
export default [
    {
        path: '/',
        loadComponent: ()=>import('./routes/IndexPage'),
        exact: false,
        routes: [
            {
                path: '/home',
                loadComponent: ()=>import(/* webpackChunkName: 'Home' */'./routes/Home'),
                models:()=>[import(/* webpackChunkName: 'HomeModel' */'./models/home')],
                redirect:true
            },
            {
                path: '/user',
                loadComponent: ()=>import(/* webpackChunkName: 'User' */'./routes/User')
            },
            {
                path: '/profile',
                loadComponent: ()=>import(/* webpackChunkName: 'Profile' */'./routes/Profile')
            },
            {
                path: '/login',
                loadComponent: ()=>import(/* webpackChunkName: 'Login' */'./routes/Login')
            },
            {
                path: '/register',
                loadComponent: ()=>import(/* webpackChunkName: 'Register' */'./routes/Register')
            }
        ]
    }
]