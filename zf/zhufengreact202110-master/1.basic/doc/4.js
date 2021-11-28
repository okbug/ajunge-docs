var _extends = (function () {
    var extendStatics = function (Child, Father) {
        return Object.setPrototypeOf(Child, Father);
    }
    return function (Child, Father) {
        extendStatics(Child, Father);
        function Temp() {
            this.constructor = Child;
        }
        Temp.prototype = Father.prototype;
        Child.prototype = new Temp();
    };
})();

var Father = (function () {
    function Father(name) {
        this.name = name;
    }
    Father.prototype.getName = function () {
        console.log(this.name);
    };
    Father.staticFatherName = "FatherName";
    Father.staticGetFatherName = function () {
        console.log(Father.staticFatherName);
    };
    return Father;
}());
//_super父类构造函数
var Child = (function (_super) {
    _extends(Child, _super);

    function Child(name, age) {
        _super.call(this, name);//继承父类的实例私有属性
        this.age = age;
        return this;
    }
    Child.prototype.getAge = function () {
        console.log(this.age);
    };
    Child.staticChildName = "ChildName";
    Child.staticGetChildName = function () {
        console.log(Child.staticChildName);
    };
    return Child;
}(Father));

let child = new Child('zhufeng', 10);
console.log(child);

child.getName();
child.getAge();
Child.staticGetFatherName();
Child.staticGetChildName();