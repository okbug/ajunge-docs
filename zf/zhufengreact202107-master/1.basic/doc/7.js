let arr = [1,2,3,4,5,{age:1}];
let arr2 = [1,2,3,4,5,{age:1}];
//比较两个数组完全相同
let result = arr.every((item,index)=>item === arr2[index]);
console.log(result);


