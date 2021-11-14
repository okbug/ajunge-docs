// // index.js

// const title = require("./title.js");
// title.text = '我在index中被修改了';

// console.log('title', title);

// const title2 = require('./title');
// console.log('title2', title2);

// console.log(title === title2);


// require('./second')

// console.log(title)

// // indexjs

// const title = require('./title');
// require('./a');
// require('./b');



// console.log(title)


const {change} = require('./a');
change() 
const {get} = require('./b');
console.log(get())
