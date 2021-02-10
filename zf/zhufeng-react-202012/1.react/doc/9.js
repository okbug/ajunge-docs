let hookStates = [0];
//hook索引，表示当前的hook
let hookIndex = 0;
function App(){
    return <div>{hookStates[0]}</div>;
}
let vdom = {
    type:App
}
let container = document.getElementById('root');
/////////更新时候
hookStates[0]=100;
compareTwoVdom(container,vdom,vdom);

function compareTwoVdom(parentDOM,oldVdom,newVdom){
    updateElement(oldVdom,newVdom);
}
function updateElement(oldVdom,newVdom){
    if(typeof oldVdom.type === 'function'){
        updateFunctionComponent(oldVdom,newVdom);
    }
}
function updateFunctionComponent(oldVdom,newVdom){
    let oldRenderVdom=oldVdom.oldRenderVdom;
    let newRenderVdom = oldVdom.type(newVdom.props);
}