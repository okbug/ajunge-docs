import { AnyAction } from 'redux';
import * as actionTypes from '../action-types';
import { Slider } from '@/typings/slider';
import { Lesson } from '@/typings/lesson';
export interface Lessons {
    loading: boolean;//是否正在加载中
    list: Lesson[];
    hasMore: boolean;//是否还有更多数据
    offset: number;//当前的偏移量 也就是开始取下一页数据的索引
    limit: number;//每页的条数
}
export interface HomeState {
    currentCategory: string;
    sliders: Slider[];
    lessons: Lessons
}
let initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        loading: false,
        list: [],
        hasMore: true,
        offset: 0,
        limit: 5
    }
};
function reducer(state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            state.currentCategory = action.payload;
            return state;
        case actionTypes.GET_SLIDERS:
            state.sliders = action.payload.data;
            return state;
        case actionTypes.SET_LESSONS_LOADING:
            state.lessons.loading = action.payload;
            return state;
        case actionTypes.SET_LESSONS:
            state.lessons.loading = false;
            state.lessons.hasMore = action.payload.hasMore;
            state.lessons.list.push(...action.payload.list);
            state.lessons.offset += action.payload.list.length
            return state;
        case actionTypes.REFRESH_LESSONS:
            state.lessons.loading = false;
            state.lessons.hasMore = action.payload.hasMore;
            state.lessons.list = action.payload.list;
            state.lessons.offset = action.payload.list.length
            return state;
        default:
            return state;
    }
}
export default reducer;