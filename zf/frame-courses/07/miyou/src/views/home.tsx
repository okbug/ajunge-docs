import React from 'react';
import style from '../css/home.module.css'
import { Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ICount } from '../store/reducers/count'

interface Iprops {
  countState: ICount,
  dispatch: Dispatch
}
class Home extends React.Component<Iprops> {
  add = () => {
    this.props.dispatch({ type: 'add', qqq: 20 })
  }
  render() {
    let { countState } = this.props
    console.log(this)
    return <div className={style.home_box}>
      <h1>{countState.count}</h1>
      <button onClick={this.add}>+</button>
      <Button>Home</Button>
    </div>;
  }
}
let Home2 = connect((state: any) => {
  // console.log(state)
  return {
    countState: state.countState
  }
}, (dispatch) => {
  return {
    dispatch
  }
})(Home)
export default Home2