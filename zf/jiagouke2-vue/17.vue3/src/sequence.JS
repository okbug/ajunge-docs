 // 1.最长递增子序列 LIS   
 // [2,5,9,6,4,7,2,7,2];      // 2 5 6 7   4个  动态规划
 // 默认用了 数组push + 二分查找 + 新数组存放老的值

 // 2 5 9 6 4 7 2 7   n  logn  = nlogn
 // let arr = [] 存放结果的
 // [2]
 // [2,5]
 // [2,5,9]   
 // //  找比6第一个大的数
 // [2,5,6] // 6比9更有潜力 因为6 比 9小 
 // [2,4,6] 
 // [2,4,6,7] // 4

 // 2 5 8 7 3 4 5 1 6
 // [2]
 // [2,5]
 // [2,5,7]
 // [1,3,4,5,6]    增长的 数量是最多的子串
 // 2 5 8 7 3 4 5 1 6  算个数 =  看哪个连续的潜力最大
 // [2]
 // [2,5]
 // [2,5,8]  // 这个数组 是上升的 二分查找 logn 
 // [2,5,7] 
 // [2,3,7] 
 // [2,3,4] 
 // [1,3,4,5]  // 如果遇到1 他要插入到第0个 我们需要忽略
 // [1,3,4,5,6]
 function getSequence(arr) {
     const result = [0]; // 默认以0 作为开头
     let p = arr.slice(); // 拷贝一个一模一样的数组
     let len = arr.length
     // i 用作循环
     let i, j, u, v, c
     for (i = 0; i < len; i++) {
         const arrI = arr[i];
         if (arrI !== 0) {
             // 这里要和最后一项比较 
             j = result[result.length - 1]
             if (arr[j] < arrI) {
                 p[i] = j // 将当前最后一项 放到p对应的索引上
                 result.push(i);
                 continue
             }
             // 当前的值 比 result中的小  去数组中找到后替换
             u = 0;
             v = result.length - 1;
             while (u < v) { // u和v 相等则停止
                 c = ((u + v) / 2) | 0; // [0 , 1, 2 ,3 , 4 ,5 ] // 1
                 //  整个结果 去找到哪个位置
                 if (arr[result[c]] < arrI) {
                     u = c + 1
                 } else {
                     v = c;
                 }
             }
             // u = v;
             // 当前要遇到的这一个 比当前数组中的那个值小
             if (arrI < arr[result[u]]) {
                 if (u > 0) {
                     p[i] = result[u - 1];
                 }
                 result[u] = i; // 这里有可能后的把前面的换掉了 导致结果有问题
             }
         }
     }
     u = result.length;
     v = result[u - 1];
     while (u-- > 0) {
         result[u] = v;
         v = p[v];
     }
     return result; // result就是标记
 }
 let result = getSequence([2, 5, 8, 7, 3, 4, 5, 1, 6])
 console.log(result)