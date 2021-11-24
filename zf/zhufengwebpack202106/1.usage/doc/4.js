
let fs = require('fs');
let dotenv = require('dotenv');
config({path: path.resolve('config/.env')})
function config({path}){
  let content = fs.readFileSync(path,'utf8');
  content.split('\n').forEach(line=>{
      let [key,value]=line.split('=');
      process.env[key]=value;
  });
}