import React from 'react';
import RouterContext from './RouterContext';
function withRouter(OldComponent){
  return props=>{
      return (
        <RouterContext.Consumer>
          {
              value=>{//{history,location,match}
                  return <OldComponent {...props} {...value}/>
              }
          }
        </RouterContext.Consumer>
      )
  }
}
export default withRouter;