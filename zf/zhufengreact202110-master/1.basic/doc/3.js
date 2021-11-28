
class Component{
    constructor(props){
        this.props = props;
    }
}
class ClassComponent extends Component{
    constructor(props){
       super(props);
       this.state = {age:13};
    }
}
let props= {};
let c = new ClassComponent(props);

//super 指的是调用父类的构造 函数
//super=Component.constructor