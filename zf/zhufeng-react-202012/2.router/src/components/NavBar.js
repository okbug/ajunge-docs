import React from 'react';
import {withRouter} from '../react-router-dom';
//Uncaught TypeError: Cannot read property 'push' of undefined
function NavBar(props){
   return (
       <div onClick={()=>props.history.push('/')}>{props.title}</div>
   )
}

export default  withRouter(NavBar);