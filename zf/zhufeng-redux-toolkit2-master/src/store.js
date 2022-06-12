import {configureStore} from '@reduxjs/toolkit';
import todoApi from './todos';
//configureStore内置一些中间件 thunk
//
const store = configureStore({
    reducer:{
        [todoApi.reducerPath]:todoApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{//你不想干掉默认中间件，而是想基于默认中间件扩展新的中间件
        //return getDefaultMiddleware();
        return getDefaultMiddleware().concat(todoApi.middleware);
    }
});
export default store;