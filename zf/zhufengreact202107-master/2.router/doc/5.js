

function joinClassName(...classNames){
    return classNames.filter(c=>c).join(' ');
}

console.log(joinClassName('a','',null,undefined,'b','c'));
