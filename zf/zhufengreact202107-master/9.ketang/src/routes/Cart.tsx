import React,{PropsWithChildren} from 'react'
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {CombinedState} from '@/store/reducers';
import { CartState } from '@/store/reducers/cart';
interface Params{}
type Props = PropsWithChildren<RouteComponentProps<Params>>

function Cart(_props:Props) {
    return (
        <div>
            Cart
        </div>
    )
}
function mapStateToProps(state:CombinedState):CartState{
    return state.home;
}
export default connect(mapStateToProps)(Cart);