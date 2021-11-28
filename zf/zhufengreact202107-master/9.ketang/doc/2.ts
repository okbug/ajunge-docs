import { ReactElement } from "_@types_react@17.0.18@@types/react"

interface Params{
    id:string
}

interface RouteComponentProps<Params>{
    history:any;
    location:any;
    match:any
}
interface StateProps{
    currentCategory:string;
}
type DispatchProps={
    setCurrentCategory:(newCategory:string)=>any
}
type ReactNode = null | undefined |string|number|ReactElement
type PropsWithChildren<T>=T&{children:ReactNode}

/* type Props = PropsWithChildren<RouteComponentProps<Params>&StateProps&DispatchProps>
let props:Props={
    history,
    location,
    match,
    currentCategory,
    setCurrentCategory
}

为啥 一堆  interface 处理完了 不用interface 用type */
// type interface
