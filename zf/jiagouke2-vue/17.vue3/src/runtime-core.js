import { nodeOps } from './runtime-dom'
import { effect } from './reactivity';
export * from './reactivity'
export function render(vnode, container) {
    // vue2 渲染页面用的方法叫patch
    // 1.初次渲染 2.dom-diff
    patch(container._vnode, vnode, container);
    container._vnode = vnode; // 上一次渲染的虚拟节点
}
/**
 * @param {*} n1  老的虚拟节点
 * @param {*} n2  新的虚拟节点
 * @param {*} container  容器
 */
function patch(n1, n2, container, anchor) { // 后续diff时可以执行此方法
    // 组件的虚拟节点 tag是一个对象
    // 如果是组件的话 tag 可能是一个对象
    if (typeof n2.tag == 'string') {
        // 标签
        processElement(n1, n2, container, anchor); // 1） 初次渲染 2） diff操作
    } else if (typeof n2.tag == 'object') {
        // 组件
        mountComponent(n2, container)
    }
}

function processElement(n1, n2, container, anchor) {
    if (n1 == null) { //初次渲染
        mountElement(n2, container, anchor);
    } else {
        patchElement(n1, n2, container);
    }
}

function patchElement(n1, n2, container) {
    // 看一下 n1 和 n2 是否一样。。。。  考虑key 不考虑没有key的情况

    let el = n2.el = n1.el; // 节点一样就复用

    const oldProps = n1.props;
    const newProps = n2.props;
    patchProps(el, oldProps, newProps);
    // 比对元素中的孩子
    patchChildren(n1, n2, el);
}

function patchChildren(n1, n2, container) {
    const c1 = n1.children;
    const c2 = n2.children;
    // 可能有多个儿子  另一方没儿子

    if (typeof c2 == 'string') {
        if (c1 !== c2) { // 直接用问题替换
            nodeOps.hostSetElementText(container, c2)
        }
    } else {
        // c2 是数组
        if (typeof c1 == 'string') { // 先删除c1 中原有内容 插入新内容
            nodeOps.hostSetElementText(container, '');
            mountChildren(c2, container);
        } else {
            patchKeyedChildren(c1, c2, container);
        }
    }
    // 相反
    // 两方都有儿子
}

function patchKeyedChildren(c1, c2, container) { // key的比较
    let e1 = c1.length - 1; // 老的最后一项的索引
    let e2 = c2.length - 1; // 新的最后一项的索引

    // 内部有优化 头头比较   尾尾比较  头尾  尾头
    const keyedToNewIndexMap = new Map();
    // 1.根据新节点 生成一个key =》 index的映射表
    for (let i = 0; i <= e2; i++) {
        const currentEle = c2[i]; // 拿到这一项
        keyedToNewIndexMap.set(currentEle.props.key, i);
    }
    // 2.去老的里面找 看看有没有对应的  如果有一样的就复用
    const newIndexToOldIndexMap = new Array(e2 + 1); // [-1,-1,-1,-1]
    for (let i = 0; i <= e2; i++) newIndexToOldIndexMap[i] = -1;
    for (let i = 0; i <= e1; i++) {
        const oldVnode = c1[i];
        // 新的索引
        let newIndex = keyedToNewIndexMap.get(oldVnode.props.key);
        if (newIndex == undefined) {
            // 老的有新的没有
            nodeOps.remove(oldVnode.el); // 删除老节点
        } else {
            // 复用 并且比对属性  因为在算法内部没有考虑值为0的情况
            newIndexToOldIndexMap[newIndex] = i + 1; // [0,1,-1,-1]
            patch(oldVnode, c2[newIndex], container); // 递归 比较儿子和标签属性

            console.log(newIndexToOldIndexMap)
        }
    }
    let sequence = getSequence(newIndexToOldIndexMap); // 
    let j = sequence.length - 1; // 获取最后的索引
    // 以上方法仅仅是比对和删除无用节点 没有移动操作
    // 这里我们从后往前插入
    for (let i = e2; i >= 0; i--) {
        let currentEle = c2[i];
        const anchor = i + 1 <= e2 ? c2[i + 1].el : null;
        // 有种可能新的比老的多 有可能新的比老的多 [A,B,C,D] [A,B]
        if (newIndexToOldIndexMap[i] === -1) {
            // 这是一个新元素 需要插入到列表中
            patch(null, currentEle, container, anchor); // 插入到某个人的前面，而不是放到容器的后面
        } else {
            // 先将d扔到页面中
            // 根据最长递增子序列 来确定不需要移动的元素，直接跳过即可
            if (i == sequence[j]) { // A B C D 
                j--;
            } else {
                // 获取不需要移动的 最长个数   
                nodeOps.insert(currentEle.el, container, anchor);
            }
        }
    }
    // 3.新的比老的多 添加  老的比新的多就删除
    // 4.两个人key一样 比较属性，移动
}

function getSequence(arr) { // 最长递增子序列的索引
    const p = arr.slice()
    const result = [0]
    let i, j, u, v, c
    const len = arr.length
    for (i = 0; i < len; i++) {
        const arrI = arr[i]
        if (arrI !== 0) {
            j = result[result.length - 1]
            if (arr[j] < arrI) {
                p[i] = j
                result.push(i)
                continue
            }
            u = 0
            v = result.length - 1
            while (u < v) {
                c = ((u + v) / 2) | 0
                if (arr[result[c]] < arrI) {
                    u = c + 1
                } else {
                    v = c
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1]
                }
                result[u] = i
            }
        }
    }
    u = result.length
    v = result[u - 1]
    while (u-- > 0) {
        result[u] = v
        v = p[v]
    }
    return result
}

function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
        // 比较属性
        // 1.将新的属性 全部设置 以新的为准
        for (let key in newProps) {
            const p = oldProps[key];
            const n = newProps[key];
            if (n !== p) { // 老的和新的不一样 以新的为准
                nodeOps.hostPatchProps(el, key, p, n);
            }
        }
        // 2.老的里面有的  新的没有 需要删掉
        for (const key in oldProps) {
            if (!newProps.hasOwnProperty(key)) {
                // 如果老的里面多的得删除掉
                nodeOps.hostPatchProps(el, key, oldProps[key], null);
            }
        }
    }
}

function mountComponent(vnode, container) {
    // 根据组件创建一个实例
    const instance = {
        vnode,
        render: null, // 当前setup的返回值
        subTree: null, //render方法的返回的结果
    }
    const Component = vnode.tag;
    instance.render = Component.setup(vnode.props, instance);
    // 每个组件都有一个effect 用于局部重新渲染
    effect(() => {
        // 如果返回的是对象  template =》 render方法 把render方法在挂载到对象上
        // 这里可以做vue2 兼容 拿到vue2中的options API 和setup的返回值
        instance.subTree = instance.render && instance.render();
        patch(null, instance.subTree, container); // 将组件插入到容器中
    })
}


function mountElement(vnode, container, anchor) {
    const { tag, children, props } = vnode;
    // 将虚拟节点和真实节点 创造映射关系
    let el = (vnode.el = nodeOps.createElement(tag));
    if (props) { // 将当前属性赋予给当前el
        for (let key in props) {
            nodeOps.hostPatchProps(el, key, {}, props[key])
        }
    }

    if (Array.isArray(children)) {
        mountChildren(children, el);
    } else {
        nodeOps.hostSetElementText(el, children);
    }
    nodeOps.insert(el, container, anchor);
}

function mountChildren(children, container) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        patch(null, child, container); // 递归挂载孩子节点
    }
}