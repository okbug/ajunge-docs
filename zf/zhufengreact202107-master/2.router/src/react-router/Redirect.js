import React from 'react';
import RouterContext from './RouterContext';
import Lifecycle from './Lifecycle';

function Redirect({to}){
  return (
      <RouterContext.Consumer>
          {
              value=>{
                  const {history} = value;
                 /*  history.push(to);
                  return null; */
                  return <Lifecycle onMount={()=>history.push(to)}/>
              }
          }
      </RouterContext.Consumer>
  )
}

export default Redirect;