import * as actionTypes from '@/store/action-types';
import { getSliders, getLessons } from '@/api/home';
const actionCreators = {
    setCurrentCategory(currentCategory: string) {
        return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory };
    },
    getSliders() {
        return {
            type: actionTypes.GET_SLIDERS,
            payload: getSliders()
        }
    },
    getLessons() {
        return function (dispatch: Function, getState: Function) {
            ; (async function () {
                let state = getState();
                let { currentCategory, lessons: { hasMore, offset, limit, loading } } = state.home;
                if (hasMore && !loading) {
                    dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
                    let result = await getLessons(currentCategory, offset, limit);
                    dispatch({ type: actionTypes.SET_LESSONS, payload: result.data });
                }
            })();
        }
    },
    refreshLessons() {
        return function (dispatch: Function, getState: Function) {
            ; (async function () {
                let state = getState();
                let { currentCategory, lessons: { limit, loading } } = state.home;
                if (!loading) {
                    dispatch({ type: actionTypes.SET_LESSONS_LOADING, payload: true });
                    let result = await getLessons(currentCategory, 0, limit);
                    dispatch({ type: actionTypes.REFRESH_LESSONS, payload: result.data });
                }
            })();
        }
    }

}
export default actionCreators;