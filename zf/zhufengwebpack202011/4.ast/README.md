## 目标
- 实现最简单 tree-shaking


## 问题
import {flatten,concat} from 'lodash';

import flatten from 'lodash/flatten';
import concat from 'lodash/concat';


为什么这种情况需要用 enter 昨天的用visitor ？


性能
tree-shaking还有哪些常见的？ 

学习tree-shaking 
实战 
原理
老师，rollup  的 tree sharking 感觉和我们这个不一样呀。 他那个是怎么实现的呀？ 

在我们webpack最后的时候我们会单独讲这个rollup tree shaking原理
自己实现这个tree-shaking过程 
原理就是分析 AST语法树
找出那些没有用到的变量，无法执行代码，进行删除



