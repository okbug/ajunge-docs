// 观察者模式 需要有两个类   2. 观察者
class Subject{ // 1.被观察者
    constructor(name){
        this.name = name;
        this.observers = [];
        this.state = '开心'
    }
    attach(o){
        this.observers.push(o); // 订阅模式， 被观察者需要接受观察者
    }
    setState(newState){
        this.state = newState
        this.observers.forEach(o=>o.update(newState))
    }
}
class Observer{ // 2. 观察者
    constructor(name){
        this.name = name;
    }
    update(state){
        console.log(this.name + ':' + '当前状态是' + state);
    }
}
// 我家有个小宝宝 ， 爸爸和妈妈要关心小宝包的状态 ， 小宝宝不开心 会主动通知观察者
let s = new Subject('宝宝');
let o1 = new Observer('爸爸');
let o2 = new Observer('妈妈');
s.attach(o1)
s.attach(o2)
s.setState('不开心');
s.setState('开心');