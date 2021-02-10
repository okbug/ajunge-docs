let pathToRegExp = require('path-to-regexp');
let regxp = pathToRegExp('/home',[],{end:true});
console.log(regxp);//  ^\/home(?:\/(?=$))?$
console.log(regxp.test('/home'));
console.log(regxp.test('/home/'));
console.log(regxp.test('/home/user'));
console.log('===============');
let regxp2 = pathToRegExp('/home',[],{end:false});
console.log(regxp2);//  ^\/home(?:\/(?=$))?(?=\/|$)
console.log(regxp2.test('/home'));
console.log(regxp2.test('/home/'));
console.log(regxp2.test('/home//'));
console.log('/home//'.match(/^\/home(\/$)?(\/|$)/));
