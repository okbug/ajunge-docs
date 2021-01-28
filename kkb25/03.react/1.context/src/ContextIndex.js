import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import { JunContext } from './Context.js'
let { Provider } = JunContext
const value = {
  name:'shabiajunge',
  age:21,
  info: {
    address:'pt',
    phone:'13912291921'
  }
}
ReactDOM.render(
  (
    <>
      <Provider value={value}>
        <App></App>
      </Provider>
    </>
  )
  ,
  document.getElementById('root')
);