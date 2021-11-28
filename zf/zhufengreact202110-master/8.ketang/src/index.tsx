import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import './style/common.less';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Profile from './routes/Profile';
import Register from './routes/Register';
import Login from './routes/Login';
import Detail from './routes/Detail';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import Tabs from './components/Tabs';
import { Spin } from 'antd';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Spin />} persistor={persistor}>
            <ConnectedRouter history={history}>
                <main className="main-container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/detail/:id" component={Detail} />
                        <Redirect to="/" />
                    </Switch>
                    <Tabs />
                </main>
            </ConnectedRouter>
        </PersistGate>

    </Provider >

    , document.getElementById('root'));