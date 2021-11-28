
//tring  span div  原生组件
//JSXElementConstructor  类组件或者函数组件

type JSXElementConstructor<P> =
        | ((props: P) => ReactElement<any, any> | null) //函数组件
        | (new (props: P) => Component<P, any>);//类组件

interface ReactElement<P = any, T extends string 
| JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
}
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild  | boolean | null | undefined;
type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
