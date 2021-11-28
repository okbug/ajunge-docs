import React, { Component } from 'react'
import {Router} from 'react-router';
import {LOCATION_CHANGE} from './connectRouter';
//import {ReactReduxContext} from 'react-redux'
import {connect} from 'react-redux'
class ConnectedRouter extends Component {
    //static contextType = ReactReduxContext;
    constructor(props,context){//context=Provider提供的value
        super(props);
        this.unlisten = this.props.history.listen(this.props.onLocationChanged);
    }
    componentWillUnmount(){
        this.unlisten();
    }
    render() {
        return (
            <Router history={this.props.history}>
                    {this.props.children}
            </Router>
        )
    }
}
let mapDispatchToProps = dispatch=>({
    onLocationChanged:(location,action)=>{
        dispatch({type:LOCATION_CHANGE,payload:{location,action}});
    }
})
export default connect(null,mapDispatchToProps)(ConnectedRouter);
/**
 * __都是内部的
 */