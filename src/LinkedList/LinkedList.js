const e = require("express");

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

        if (this.head === null) {
            this.head = new _Node(item, this.head)
        }
        else {
            let tempNode = this.head;
            this.head = new _Node(item, tempNode)
        }
    }

    insertAt(item, pos) {
        if (pos === 1) {

            let node = this.head;
            let hold = node.next;
            const newNode = new _Node(item, hold);
            node.next = newNode;

            return {
                newHead: { ...this.head.value },
                beforeMoved: { ...node.value },
                moved: item,
                afterMoved: { ...newNode.next.value }
            }
        }
        else {
            let node = this.find(pos);
            if (node.next == null) {
                const newNode = new _Node(item, null)

                node.next = newNode;

                return {
                    newHead: { ...this.head.value },
                    beforeMoved: { ...node.value },
                    moved: item,
                    afterMoved: null,
                }
            }
            //this needs to be inserted before node not after
            else {
                //one before this?
                let hold = node.next.next
                const newNode = new _Node(item, hold)
                node.next = newNode;

                return {
                    newHead: { ...this.head.value },
                    beforeMoved: { ...node.value },
                    moved: item,
                    afterMoved: { ...newNode.next.value }
                }
            }
        }
    }

    find(pos) {

        let node = this.head;

        for (let i = 2; i < pos; i++) {
            if (!node.next) {
                console.log('//////////////////////////////////////////////')
                console.log(`Node returned because no next ${pos}`, node.value)
                return node;
            }
            else {
                node = node.next
            }
        }
        console.log('//////////////////////////////////////////////')
        console.log(`Node returned at position ${pos}`, node.value)
        return node;
    }

    removeHead() {
        if (this.head) {
            let hold = this.head;
            this.head = this.head.next

            return hold;
        }
        else {
            return null;
        }

    }

}

module.exports = LinkedList;