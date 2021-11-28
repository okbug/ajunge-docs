import { AnyAction } from 'redux';
import { CartItem, CartState } from '@/typings/cart';
import * as actionTypes from '@/store/action-types';

let initialState: CartState = [];
function reducer(state: CartState = initialState, action: AnyAction): CartState {
    switch (action.type) {
        case actionTypes.ADD_CART_ITEM:
            let oldIndex = state.findIndex(item => item.lesson.id === action.payload.id);
            if (oldIndex == -1) {
                state.push({
                    lesson: action.payload,
                    amount: 1,
                    checked: false
                });
            } else {//如果购物车里有这个商品，就直接修改数量
                state[oldIndex].amount += 1;
            }
            return state;
        case actionTypes.REMOVE_CART_ITEM:
            let removeIndex = state.findIndex(item => item.lesson.id === action.payload);
            state.splice(removeIndex, 1);
            return state;
        case actionTypes.CLEAR_CART_ITEMS:
            state.length = 0;
            return state;
        //更改商品的数量的时候 action.payload = {id,amount}
        case actionTypes.CHNAGE_CART_ITEM_AMOUNT:
            let index = state.findIndex(item => item.lesson.id === action.payload.id);
            state[index].amount = action.payload.amount;
            return state;
        case actionTypes.CHANGE_CHECKED_CART_ITEMS:
            let checkIds = action.payload;//选中的商品的ID的数组
            state.forEach((item: CartItem) => {
                if (checkIds.includes(item.lesson.id)) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            return state;
        case actionTypes.SETTLE:
            state = state.filter(item => !item.checked);
            return state;
    }
    return state;
}
export default reducer;