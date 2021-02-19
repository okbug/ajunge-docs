const compiler = require('vue-template-compiler');


// let { render } = compiler.compile(`<div>
//     <div slot="a">{{a}}}</div>
//     <div slot="b">{{b}}</div>
//     ooo
// </div>`);
// console.log(render); // {a:内容,b:内容,children:ooo}



// let {render} = compiler.compile(`
//     <div>
//         <slot name="a"></slot>
//         <slot name="b"></slot>
//         <slot></slot>
//     </div>
// `);
// console.log(render); // _t('a')   _t('b')  _t('default')

// 父组件中没有渲染
// let {render} = compiler.compile(`
//     <app>
//     <div slot-scope="msg" slot="footer">{{msg.a}}</div>
//     </app>
// `);
// console.log(render)
// fn: function(msg){return _c('div',{},[_v(_s(msg.a))])}


let {render} = compiler.compile(`
    <div><slot name="footer" a="1" b="2"></slot></div>
`);

console.log(render);
// with(this){return _c('div',[_t("footer",null,{"a":"1","b":"2"})],2)}




A B C D E 

// 最近的就是最后一项  最久的就是第一个
[E,C,D,B,q]