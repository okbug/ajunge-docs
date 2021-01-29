/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
ReactDOM.render(
  (
    <>
        <App></App>
    </>
  )
  ,
  document.getElementById('root')
); */



import React from './my/react'

let element = React.createElement('h1', {id:'haha'}, 'world','11')
console.log(element);
