function anonymous(obj) {
    let str = ''
    with(obj){
        str += `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            `
        arr.forEach(item => {
            str += `
             ${item}
            `
        })
        str += `
        </body>
        </html>`
        return str
    }
   
}

let r = anonymous({arr:[1,2,3,4,5]})
console.log(r)


// 摘要？ md5 不可逆的无法判断原来的值什么， 特点就是相同的内容摘要出的结果是相同的
// md5特点是1.不可逆  2.相同内容出来的结果相同 3.不同的内容 结果完全不同 （雪崩效应）4.摘要后的长度一样

const crpto = require('crypto');

const r1 = crpto.createHash('md5').update('1234').digest('base64')
const r2 = crpto.createHash('md5').update('12345').digest('base64')
console.log(r1,r2);