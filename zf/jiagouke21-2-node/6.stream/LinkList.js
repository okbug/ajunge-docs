// 线性结构 栈 （先进的后出） 队列 （先进入的先出） 链表  （数据结构的核心都是存储数据的）
// 用链表来实现栈、队列结构

// 链表就是关联每一个节点数据来使用，删除头部和尾部，向前追加 向后追加是有优势

// 单向（只有next）、双向（next、prev） 循环 tail.next-》 head  head.next-》 tail

// 双向链表 （单向链表）
class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0; // 链表的总长度
    }
    _getNode(index) {
        let head = this.head;
        for (let i = 0; i < index; i++) {
            head = head.next;
        }
        return head;
    }
    add(index, element) { // 可以传递索引，可以不传递索引
        if (arguments.length == 1) {
            element = index;
            index = this.size;
        }
        if (index == 0) { // 把链表的头给改了
            let oldHead = this.head; // 取出来老的头
            this.head = new Node(element, oldHead)
        } else {
            let prevNode = this._getNode(index - 1); // 永远找的都是当前索引的前一个节点
            prevNode.next = new Node(element, prevNode.next)
        }
        this.size++;
    }
    remove(index) {
        let removeNode
        if (index == 0 ) {
            removeNode = this.head;
            if(removeNode == null) return;
            this.head = this.head.next;
        } else {
            let prevNode = this._getNode(index - 1);
            if (!prevNode) return;
            removeNode = prevNode.next
            prevNode.next = prevNode.next.next
        }
        this.size--;
        return removeNode
    }
    update(index, element) {
        let node = this._getNode(index);
        node.element = element;
        return node;
    }
    getNode(index) {
        return this._getNode(index);
    }
    reverse() {
        function reverse(head) {
            if (head == null || head.next === null) return head;
            let newHead = reverse(head.next); // 新头变为下一个
            head.next.next = head; // 让下一个人的next 指向老的头
            head.next = null; // 老的头下一个指向是的null
            return newHead; // newHead, 就是不停的向下找 最后一个，最后一个就是头
        }
        return reverse(this.head);
    }
    reverse1() {
        let head = this.head;
        if (head === null || head.next == null) return head;
        let newHead = null;
        while (head) {
            let n = head.next; // 通过n 来引用链表，否则直接将head.next = null 后面的就回收了
            head.next = newHead; // 把当前的下一个指向新的链表头
            newHead = head; // 把第一项搬家到新的链表中
            head = n;
        }
        return newHead
    }
}
// let ll = new LinkedList;
// ll.add(1);
// ll.add(2); // 给0索引节点后面添加2
// ll.add(3);
// ll.add(4);

// console.dir(ll.reverse1(), { depth: 1000 })

// 3.20 继续

class Queue {
    constructor() {
        this.ll = new LinkedList
    }
    add(element) {
        this.ll.add(element)
    }
    peak() {
        return this.ll.remove(0);
    }
}

// 链表的反转， 如何反转一个单向链表

exports.LinkedList = LinkedList;
exports.Queue = Queue;