/* class Parent {
    constructor(props) {
        this.props = props;
    }
}
class Child extends Parent {
    constructor(props) {
        super(props);
    }
} */
//super值的是child.call(parent)￼

function Parent(props) {
    this.props = props;
}
function Child(props) {
    debugger
    Parent.call(this, props);
}
let child = new Child({ title: '标题' });
console.log(child);