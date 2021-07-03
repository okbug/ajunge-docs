import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider, connect } from 'react-redux'
import { Provider, connect } from './myreact_redux'
import store from './store'
class App extends React.Component {

  render() {
    let { color, count, dispatch } = this.props;
    return <div className=''>
      <h1 style={{ color: color }}>{count}</h1>
      <button onClick={() => {
        dispatch({ type: 'add', num: 10 })
      }}>+</button>
      <button onClick={() => {
        dispatch({ type: 'minus', num: 5 })
      }}>-</button>

      <button onClick={() => {
        dispatch(function (dispatch, getState) {
          setTimeout(() => {
            dispatch({ type: 'add', num: 10 })
            console.log(getState())
          }, 2000);
        })
      }}>async+</button>
    </div>;
  }
}
App = connect((state) => {
  return {
    color: state.colorR.color,
    count: state.countR.count
  }
}, (dispatch) => {
  return {
    dispatch
  }
})(App)

ReactDOM.render(<Provider store={store}>
  <App className='box' />
</Provider>, document.getElementById('root'))