import React from 'react';
import ReactReduxContext from './ReactReduxContext';
function Provider(props){
    //let value = {store:props.store};
    let [stateValue,setStateValue] = React.useState({store:props.store});
    //Provider的下层组件都可以通过ReactReduxContext获取value值 
    setTimeout(()=>{
        setStateValue({store:{...stateValue.store}});
    },3000);
    return (
        <ReactReduxContext.Provider value={stateValue}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}
export default Provider;
