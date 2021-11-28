class Parent{
    constructor(){
        console.log('Parent');
    }
}
class Child extends Parent{
    constructor(){
        //在创建子类的时候 ，借用了一下父类的构造函数初始化了子类的实例
        super();
        console.log('Child');
    }

}
let child = new Child();