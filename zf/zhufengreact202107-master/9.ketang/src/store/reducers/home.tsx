import { AnyAction } from 'redux';
import *  as actionTypes from '@/store/action-types';
import { Slider } from '@/typings/slider';
import { Lesson } from '@/typings/lesson';
export interface Lessons {
    list: Lesson[],//当前的课程列表
    loading: boolean;//是否正在加载数据
    hasMore: boolean;//是否还有更多数据
    offset: number;//从第几个索引开始加载 偏移量
    limit: number;//每页的条数
}
export interface HomeState {
    currentCategory: string;
    sliders: Slider[],
    lessons: Lessons;
}
let initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        list: [],
        loading: false,
        hasMore: true,
        offset: 0,
        limit: 5
    }
};
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload };
        case actionTypes.GET_SLIDERS:
            return { ...state, sliders: action.payload.data };
        case actionTypes.SET_LESSON_LOADING:
            return { ...state, lessons: { ...state.lessons, loading: action.payload } };
        case actionTypes.SET_LESSONS:
            return {
                ...state, lessons: {
                    ...state.lessons,
                    list: [...state.lessons.list, ...action.payload.list],
                    loading: false,
                    hasMore: action.payload.hasMore,
                    offset: state.lessons.offset + action.payload.list.length
                }
            };
        case actionTypes.REFRESH_LESSONS:
            debugger
            return {
                ...state, lessons: {
                    ...state.lessons,
                    list:action.payload.list,
                    loading: false,
                    hasMore: action.payload.hasMore,
                    offset: action.payload.list.length
                }
            };
        default:
            return state;
    }
}

/* export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    //允许给这个action定义额外的属性
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any
}
js
ts
jsx
tsx

js
ts
tsx
*/