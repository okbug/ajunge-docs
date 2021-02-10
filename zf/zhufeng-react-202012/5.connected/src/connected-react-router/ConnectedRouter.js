import React from 'react';
import {connect,ReactReduxContext} from 'react-redux';
import {Router} from 'react-router';
import {locationChange} from './actions';
class ConnectedRouter extends React.Component{
  static contextType = ReactReduxContext
  //入ConnectedRouter 可以实现监听路径变化的功能，当路径发生变化后会派发特定的action
  componentDidMount(){
    //当路径发生变化的时候，会执行回执行回调，并传递最新的location和action
    this.props.history.listen((location,action)=>{
        console.log('ConnectedRouter',location,action);
        this.props.dispatch(locationChange(location,action));
        //this.context.store.dispatch(locationChange(location,action));
    });
  }
  render(){
      const {history,children} = this.props;
      return (
          <Router history={history}>
              {children}
          </Router>
      )
  }
}
//export default ConnectedRouter;
export default connect(state=>state)(ConnectedRouter);