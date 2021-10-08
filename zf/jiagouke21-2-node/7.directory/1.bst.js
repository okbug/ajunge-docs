class Node {
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor(compare) {
        this.root = null;
        let internalCompare = this.compare
        this.compare = compare || internalCompare;
    }
    compare(current, element) {
        return current - element > 0
    }
    add(element) {
        if (this.root == null) {
            this.root = new Node(element, null);
            return;
        } else {
            let current = this.root;
            let parent = null;
            let compare = true;
            while (current) { // 从根上不停的查找
                parent = current;
                compare = this.compare(current.element, element)
                if (compare) { // 左边
                    current = current.left;
                } else { // 右边 
                    current = current.right;
                }
            }
            // 创造一个新的节点，需要把他插入到parent 左边或者右边
            let newNode = new Node(element, parent)
            if (compare) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        }
    }
    // 树的遍历 三种遍历 前序 中序 后序  广度、深度
    preorderTraversal(cb) {
        const traversal = (node) => {
            if (node == null) return;
            cb(node);
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this.root);
    }
    inorderTraversal(cb) {
        const traversal = (node) => {
            if (node == null) return;
            traversal(node.left);
            cb(node);
            traversal(node.right);
        }
        traversal(this.root);
    }
    postorderTraversal(cb) {
        const traversal = (node) => {
            if (node == null) return;
            traversal(node.left);
            traversal(node.right);
            cb(node)
        }
        traversal(this.root);
    }
    levelOrderTraversal(cb){
        let stack = [this.root];
        let i = 0; 
        let currentNode;
        while (currentNode = stack[i++]) {
            cb(currentNode)
            if(currentNode.left){
                stack.push(currentNode.left)
            }
            if(currentNode.right){
                stack.push(currentNode.right)
            }
        }
    }
    invertTree() {
        const traversal = (node) => {
            if (node == null) return;
            let r = node.right;
            node.right = node.left;
            node.left = r;
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this.root);
        return this.root
    }
}
let bst = new BST((a, b) => {
    return a.age - b.age > 0; // 返回true/ false
}); // binary search tree
let arr = [{ age: 10 }, { age: 8 }, { age: 19 }, { age: 6 }, { age: 15 }, { age: 22 }]; // 
arr.forEach(item => {
    bst.add(item);
});
// console.dir(bst, { depth: 20 })

// bst.levelOrderTraversal((node)=>{ // babel -> transform 内部会遍历树将节点跑出来
//     console.log(node.element)
// })

// 反转二叉树 如何实现？

console.log(bst.invertTree())

// 遍历的方式 树的反转 

// 4.40继续