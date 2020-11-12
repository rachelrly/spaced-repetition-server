class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head)
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }
    insertAt(item, pos) {
        let node = this.head;
        let counter = 1

        while (counter < pos - 1) {
            counter++
            node = node.next
        }

        let next = node.next;
        node.next = new _Node(item, next)
    }
    removeHead() {
        let hold = this.head;
        this.head = this.head.next
        return hold;
    }

}

module.exports = LinkedList;