import React, { useContext, useEffect, useState } from 'react'

const Context = React.createContext();
export class Provider extends React.Component {
  render() {
    let { store, children } = this.props;
    return <Context.Provider value={{ store: store }}>
      {children}
    </Context.Provider>
  }
}

export const connect2 = (mapStateToProps, mapDispatchToProps) => {
  return (Comp) => {
    return class Temp extends React.Component {
      static contextType = Context;
      componentDidMount() {
        this.clear = this.context.store.subscribe(() => {
          this.setState({})
        })
      }
      componentWillUnmount() {
        this.clear()
      }
      render() {
        console.log(this.context)
        return <Comp
          {...this.props}
          {...mapStateToProps(this.context.store.getState())}
          {...mapDispatchToProps(this.context.store.dispatch)} />
      }
    }
  }
}

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Comp) => {
    return function (props) {
      let context = useContext(Context);
      let [t, setT] = useState(0)
      useEffect(() => {
        let clear = context.store.subscribe(() => {
          // this.setState({})
          setT(Math.random())
        })
        return clear
      }, [])
      return <Comp
        {...props}
        {...mapStateToProps(context.store.getState())}
        {...mapDispatchToProps(context.store.dispatch)} />
    }
  }
}