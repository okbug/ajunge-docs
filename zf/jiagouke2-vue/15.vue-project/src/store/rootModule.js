import * as types from './action-types';
import { getBannerList } from '@/api/public'
export default {
    state: {
        // 轮播图数据
        bannerList: [],
        ajaxTokens:[]
    },
    mutations: {
        // mutation将状态放到bannerList中
        async [types.SET_BANNER_LIST](state, payload) {
                state.bannerList = payload
        },
        [types.SET_REQUEST_TOKEN](state,payload){
            if(payload == 'clear'){
                state.ajaxTokens = [];
            }else{
                state.ajaxTokens = [...state.ajaxTokens,payload]
            }
        }
    },
    actions: {
        // 调用获取轮播图接口,提交到mutation中
        async [types.SET_BANNER_LIST]({ commit }) {
            let bannerList = await getBannerList();
            commit(types.SET_BANNER_LIST, bannerList);
        }
    }
}

