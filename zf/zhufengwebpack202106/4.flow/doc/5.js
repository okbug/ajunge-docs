/* 
let slash = require('slash').default;
import slash from 'slash'; */
console.log(process.cwd());//\

function toUnitPath(filePath){
    return filePath.replace(/\\/g,'/');
}
//const baseDir = toUnitPath(process.cwd());///
//const baseDir = slash(process.cwd());///
console.log(baseDir);//\