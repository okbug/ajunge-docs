/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={"./src/index.css":()=>{},"./src/title.js":(e,t,r)=>{function o(){return"getTitle"}r.d(t,{getTitle:()=>o}),document.title="修改标题"}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{r("./src/index.css");let e=(0,r("./src/title.js").getTitle)();console.log(e)})()})();