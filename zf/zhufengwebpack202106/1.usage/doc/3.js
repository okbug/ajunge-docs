let crypto = require('crypto')
let fs = require('fs')
let content = fs.readFileSync('./kf.jpg');
let hash = crypto.createHash('md5').update(content).digest('hex').slice(0,10);
console.log(hash);
