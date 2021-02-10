let arr1 =[1,2,3,undefined];
let arr2 = [1,2,3,4];
let result = arr1.every((item,index)=>arr1[index]===arr2[index]);
console.log(result);
//依赖项的长度肯定是永远不变的