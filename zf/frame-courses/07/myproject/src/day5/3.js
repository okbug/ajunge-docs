import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'

/* 
Provider 就是用来保住跟组件的 
connect 是哪个组件想用redux中的数据 就用connect处理哪个组件

*/
import { connect, Provider } from 'react-redux'
import { getName } from './store/actions'
class App extends React.Component {
  getName = () => {
    this.props.dispatch(getName()).then(data => {
      console.log(data)
    })
  }
  componentDidMount() {
    this.getName()
  }
  render() {
    console.log(this)
    let { state, dispatch } = this.props;
    return <div className=''>
      <input type="text" value={state.nameState.name} onChange={(e) => {
        dispatch({ type: 'CHANGENAME', name: e.target.value })
      }} />
      <h1>{state.countState.count}---{state.nameState.name}</h1>
      <button onClick={() => { dispatch({ type: 'ADD', qqq: 20, name: 'hahaha' }) }}>+</button>
      <button onClick={() => { dispatch({ type: 'MINUS', www: 10 }) }}>-</button>
    </div>;
  }
}
App = connect((state) => ({ state: state }), (dispatch) => ({ dispatch: dispatch }))(App)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))


