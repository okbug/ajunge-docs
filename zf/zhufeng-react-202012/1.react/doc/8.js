function Father(){
    this.state = {name:'zhufeng'};
}
function Child(){
    this.state = {number:10};
}
let obj = {};
Father.call(obj);
console.log(obj);
Child.call(obj);
console.log(obj);