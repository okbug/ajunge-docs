//上一个不需要移动的老节点的索引
let lastPlacedIndex = 0;
//声明一个map,把老的儿子的key和它对应的虚拟DOM节点关联起来放在map里
let oldChildrenMap = {
    'A':'A对应虚拟DOM', 'B':'B对应虚拟DOM', 'C':'C对应虚拟DOM', 'D':'D对应虚拟DOM', 'E':'E对应虚拟DOM', 'F':'F对应虚拟DOM',
};
//开始循环新的儿子数组
let newChildren=[];
for(let i=0;i<newChildren.length;i++){
    let newChild = newChildren[i];//A的虚拟DOM节点
    let newKey = newChild.key;//A
    let oldChild = oldChildrenMap[newKey];
    if(oldChild){
        //先更新oldChild A 只是更新自己的属性 id className
        //如果找到的可以复用的老的DOM节点它原来的挂载索引要比lastPlacedIndex要小，就需要移动，否则 不需要移动
        if(oldChild._mountIndex<lastPlacedIndex){
            //可以复用老节点，但是老节点需要移动到当前索引位置 
        }
        lastPlacedIndex=Math.max(lastPlacedIndex,oldChild._mountIndex);
    }

}
