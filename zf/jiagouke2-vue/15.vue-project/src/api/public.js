import * as config from './config';
import axios from '@/utils/axios'

//  接口的调用 如果接口需要将返回的结果放到vuex中，需要把调用放到action中


// 获取轮播图接口 
export const getBannerList = () => axios.get(config.getBannerList);


export const getCaptcha = (uid) => {
    if (uid) {
        return axios.get(config.getCaptcha, {
            params: { uid: uid }
        })
    }
    return Promise.reject(`uid 不存在`);
}