let vdom = {name:'zhufeng'};
Object.freeze(vdom);
Object.seal(vdom);
vdom.age = 13;
console.log(vdom);