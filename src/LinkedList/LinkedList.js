const { listen } = require("../app");

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

        if (pos === 1) {
            node = node.next;
            const hold = node.next;
            node.next = new _Node(item, hold)

            return {
                head: this.head.value.id,
                next: node.value.next
            }

        } else {
            let counter = 1

            while (counter < pos || node.next) {
                counter++
                node = node.next
            }

            if (node.next) {
                let next = node.next
                node.next = new _Node(item, next)
                console.log(this.head.value.id)
                return {
                    head: this.head.value.id,
                    next: node.value.next
                }

            } else {
                node.next = new _Node(item, null)
                console.log(this.head.value.id)
                return {
                    head: this.head.value.id,
                    next: null
                }
            }




        }







    }
    removeHead() {
        if (this.head) {
            let hold = this.head;
            this.head = this.head.next
            return hold;

        }

        return null;
    }

}

module.exports = LinkedList;