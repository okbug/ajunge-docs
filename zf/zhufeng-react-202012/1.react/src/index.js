import React from './react';
import ReactDOM from './react-dom';
/**
 * Function components cannot be given refs. 
 * Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
 * forwardRef render functions accept exactly two parameters: props and ref. 
 * Did you forget to use the ref parameter?
 * 儿子只想让父亲能有获得焦点的功能，不能干别的
 * @param {*} props 
 */
function Child(props,childRef){
  let inputRef = React.createRef();
  React.useImperativeHandle(childRef,()=>(
    {
      focus(){
        inputRef.current.focus();
      }
    }
  ));
  return <input ref={inputRef}/>;//inputRef.current.focus();让这个真实的input获得焦点
}
/**
 * 因为类组件是有实例的，所以你可能给类组件加ref属性 ref.current=类的实例
 * @param {}} props 
 */
const ForwardedChild = React.forwardRef(Child);
function Parent(props){
  let [count,setCount]=React.useState(0);
  let childRef = React.createRef();//childRef.current=
  let getFocus = ()=>{
    childRef.current.focus();
    childRef.current.remove();
  }
  return (
    <div>
      <ForwardedChild ref={childRef}/>
      <button onClick={getFocus}>获取焦点</button>
      <p>{count}</p>
      <button onClick={()=>setCount(count+1)}>+</button>
    </div>
  )
}

function Counter(props){
  React.useEffect(()=>{
     console.log('Counter DidMount or DidUpdate');
     return ()=>{
      console.log('Counter willUnmount');
     }
  });
  return (
    <div>
      <p>{props.number}</p>
    </div>
  )
}
function App(){
  const [number,setNumber]=React.useState(0);
  return (
    <div>
      {number<=2?<Counter number={number}/>:null}
      <button onClick={()=>setNumber(number=>number+1)}>+</button>
    </div>
  )
}
ReactDOM.render(<App/>,document.getElementById('root'));
