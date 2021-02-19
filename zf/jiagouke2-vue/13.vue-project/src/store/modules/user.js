import * as types from '@/store/action-types';
import * as api from '@/api/user'
export default {
    state: {
        userInfo: {} // 存储用户数据
    },
    mutations: {
        // 设置用户信息
        [types.SET_USER](state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        // 用户 =》 action =》 接口 =》 mutation
        async [types.SET_USER_LOGIN]({ commit }, options) {
            // 调用登录接口
            try {
                let userInfo = await api.login(options);
                // 存储登录信息
                commit(types.SET_USER, userInfo);
            } catch (e) {
                return Promise.reject(e);
            }
        }
    },
}