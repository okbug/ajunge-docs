import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,Route,Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import './style/common.less';//全局样式
import  {ConnectedRouter} from 'connected-react-router';
import history from './store/history';
import store from './store';
import Tabs from './components/Tabs';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Login from './routes/Login';
import Detail from './routes/Detail';
ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
        <main className="main-container">
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/detail/:id" exact component={Detail}/>
                <Redirect to="/"/>
            </Switch>    
        </main>
        <Tabs/>
    </ConnectedRouter>
</Provider>,document.getElementById('root'));

