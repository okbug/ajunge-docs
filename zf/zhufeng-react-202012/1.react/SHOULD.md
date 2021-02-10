shouldComponentUpdate {number: 0} {number: 1}
shouldComponentUpdate {number: 1} {number: 2}
componentWillUpdate {number: 1}
componentDidUpdate {number: 2}

shouldComponentUpdate {number: 0} {number: 1}
shouldComponentUpdate {number: 1} {number: 2}
componentWillUpdate {number: 1}
componentDidUpdate {number: 2}


奇怪 那为什么之前没有打印2次的问题 之前没有请updaer 
set.add(1);
set.add(1);
set.size==1 
原来是Set,元素是唯一的，多次添加同一个元素，只会保留一个
136****2778
为啥不用set 用数组了？ 
10:02
136****2778
老师总结一下 是哪些地方改了 

updater里什么情况下会有多个值 
如果说一个组件有子组件的时候
父组件更新了，子组也会更新
array, set
set是无序的
迭代的顺序跟放置的顺序没有关系


updateQueue.updaters 存的是整个应用的组件this吧  它不是每次执行重新生成的啊 
updateQueue和updaters是单例的，整个应用只有一份,

回头看一下 git修改的记录就好了 再琢磨琢磨 
136****2778撤回了一条消息
136****2778
刚才说的点快一点就bu 行了 是怎么解决的？ 
 
0-1
updateQueue 里面要 使用updateQueue，变量提升了吗？ 


弄用this 
一业撤回了一条消息
136****2778
为啥this改成updateQUEUE 
开心麻花
不过清不清set 应该不影响第一次点击的打印 
开心麻花
之前出现了 老师第一次点 也打印了两次 
问题应该不是updatequeue。那边不会导致首次打印两个shouldupdate 是的

