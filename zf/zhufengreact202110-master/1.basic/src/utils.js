import { REACT_TEXT } from './constants';
/**
 * 为了更方便的进行虚拟DOM的对比，我们把虚拟DOM进行一下包装
 * 需要把字符串或者数字也变成一个对象
 */
export function wrapToVdom(element) {
   return typeof element === 'string'
      || typeof element === 'number'
      ? { type: REACT_TEXT, props: { content: element } } : element
}

export function shallowEqual(obj1, obj2) {
   //如果地址一样，就认为是相等的
   if (obj1 === obj2) {
      return true;
   }
   //只要任何一个不是对象或者说是一个null ,那就不相等
   if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
   }
   let keys1 = Object.keys(obj1);
   let keys2 = Object.keys(obj2);
   //如果属性的数量不相等的
   if (keys1.length !== keys2.length) {
      return false;
   }
   for (let key of keys1) {
      if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
         return false;
      }
   }
   return true;
}