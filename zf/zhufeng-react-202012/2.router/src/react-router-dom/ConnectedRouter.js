import React from 'react';
import {Router} from '../react-router';

class ConnectedRouter extends React.Component{
    render(){
        return (
            <Router history={this.props.history}>
                {this.props.children}
            </Router>
        )
    }
}
export default ConnectedRouter;