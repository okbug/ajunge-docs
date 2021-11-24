let obj = {};
var ageValue = 10;
Object.defineProperty(obj,'age',{
    //value:20,
    //writable:true,
    //enumerable:true
    get(){
        return ageValue;
    },
    set(newValue){
        ageValue=newValue;
    }
});
console.log(obj);
console.log(obj.age);
obj.age = 30;
console.log(obj.age);