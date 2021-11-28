function classnames(classNames){
   return Object.keys(classNames).reduce((memo,key)=>{
        if(classNames[key]){
            memo.push(key)
        }
        return memo;
    },[]).join(' ');
}
let ret = classnames({
    active:true,
    red:false,
    green:true
})
console.log(ret);

// "green active"