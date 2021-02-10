let child = {
    a:1
}
let parent = {
    b:2
}
Object.setPrototypeOf(child,parent);
console.log(child.a,child.b);
for(let key in child){
    if(child.hasOwnProperty(key)){
        console.log(key);
    }
}
console.log(Object.keys(child));
console.log(Reflect.ownKeys(child));