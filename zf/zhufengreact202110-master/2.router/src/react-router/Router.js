import React from 'react'
import RouterContext from './RouterContext';

class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
    }
    constructor(props) {
        super(props);
        this.state = {
            location: props.history.location
        }
        //当监听到路由发生变化后会执行回调
        let listener = (location) => {
            console.log('listener');
            this.setState({ location });
        };
        this.unlisten = props.history.listen(listener);
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        let value = {
            history: this.props.history,
            location: this.state.location,
            match: Router.computeRootMatch(this.state.location.pathname)
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}
export default Router;