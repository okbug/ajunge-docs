import React from 'react'
const Context = React.createContext();

// Provider的目的就是 能够给后代提供获取store的方式
export class Provider extends React.Component {
  // 在使用的时候 我们是把store传给了 Provider
  render() {
    let { children, store } = this.props;
    return <Context.Provider value={{ store: store }}>
      {children}
    </Context.Provider>
  }
}

export let connect = (mapStateToProps, mapDispatchToProps) => {
  return function (Comp) {
    class Temp extends React.Component {
      static contextType = Context

      componentDidMount() {
        this.qq = this.context.store.subscribe(() => {
          this.setState({})
        })
      }
      componentWillUnmount() {
        this.qq()
      }
      render() {
        return <Comp
          {...mapStateToProps(this.context.store.getState())}
          {...mapDispatchToProps(this.context.store.dispatch)}
          {...this.props}
        />
      }
    }
    return Temp
  }
}
// App = connect((state)=>{return {a:state.xx}},(dispatch)=>{})(App)
// <App className='box'/>