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
        console.log('//////////////////////////////////////////////')
        console.log('insertAt(item, POS) =', pos)
        //pos ==== 1 || pos === 2 got 4/6 values in test correct
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
            console.log('node found at LL 45', node)
            if (node.next == null) {
                console.log('NODE.NEXT is null. found node:', node)
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
                console.log('Else ran in LL file.', this.head.value, node.value)
                //one before this?
                let hold = node.next.next
                console.log('HOLD', hold.value)
                const newNode = new _Node(item, hold)
                console.log('NEW NODE', newNode);
                node.next = newNode;
                console.log('NODE', node.value, 'NODE NEXT', node.next.value)

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