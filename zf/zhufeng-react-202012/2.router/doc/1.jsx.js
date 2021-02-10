
//JSX
let element = (
    <div>
        <span>a</span>
        <span>b</span>
    </div>
)
//需要 jsx转译 babel转译
let result = React.createElement('div',
null,React.createElement('span',null,'a'),React.createElement('span',null,'b'));
上面的代码在浏览器里执行的时候会计算出下面的虚拟DOM vdom
result={type:'dev',props:{children:[{type:'span'},{type:'span'}]}}
