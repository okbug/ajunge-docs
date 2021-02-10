let obj = {name:'zhufeng',age:12};
console.log(JSON.stringify(obj,replacer,1));

function replacer(key,value){
    if(key === 'age'){
        return value +10;
    }else{
        return value;
    }
}
console.log(obj);