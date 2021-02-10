let thisFather;
let thisChild;
class Father{
    constructor(){
        thisFather=this;
        this.state = {name:'zhufeng'};
        console.log(this);
    }
}
class Child extends Father {
    constructor(){
        super();
        thisChild=this;
        this.state = {number:10};
        console.log(this);
    }
}
let c = new Child();
console.log(thisChild===thisFather);
console.log(c.state);
//不可能拿到!
//因为你创建的是子类的实例，只有一个子类的实例对象。根本就没父类的实例对象

console.log(c.__proto__);


