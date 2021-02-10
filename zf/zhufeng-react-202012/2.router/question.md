1.切换路由生命周期的执行 


老师，问一下，是不是现在react里面所有的hooks都是用数组来维护状态了 
其实用的是链表
循环链表
first 
next 
last

first.next .next.next
fiber更新能暂停 不会影响界面的实时更新吗？ 
更新分二个阶段 一个阶段是比较虚拟DOm找差异，这个阶段可以暂停
第二个阶段叫commit ,真正修改DOm。这个阶段是同步的，不能停能
