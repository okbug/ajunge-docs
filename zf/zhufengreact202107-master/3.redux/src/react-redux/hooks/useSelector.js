import {useContext,useLayoutEffect,useReducer,useRef} from 'react';
import ReactReduxContext from "../ReactReduxContext";

function useSelector(selector,equalityFn=(a,b)=>a===b){
    const {store} = useContext(ReactReduxContext);
    let lastSelectedState = useRef(null);
    //获取仓库中的最新的状态
    let state = store.getState();
    let selectedState = selector(state);
    //每次计算完selectedState之后会判断状态变化了没有，如果变化 了，组件会刷新，如果没变化组件不刷新
    let [,forceUpdate] = useReducer(x=>x+1,0);
    useLayoutEffect(()=>store.subscribe(()=>{
        //比较老状态和新选中状态是否相等，如果相等，不刷新
        let selectedState = selector(store.getState());
        if(!equalityFn(lastSelectedState.current,selectedState)){
            console.log('重新渲染');
            forceUpdate();
            lastSelectedState.current = selectedState;
        }
    }),[]);
    //如何获取 最新的状态值  定义useEffect,然后给lastSelectedState.current赋值，可以在任何地方通过lastSelectedState.current取到新的值
    return selectedState;
}
export default useSelector;