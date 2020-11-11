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

    insertSecond() {
        let temp1 = this.head;
        console.log('temp1', temp1)
        let temp2 = temp1.next;
        this.head = temp2
        this.head.next = new _Node(temp1, temp1.next)
        // console.log('head', this.head, 'head.next', this.head.next, 'head.next.next', this.head.next.next)

    }

    // insertAfter(item, after) {
    //     let tempNode = this.head;
    //     while (tempNode.next !== this.find(after)) {
    //         tempNode = tempNode.next;
    //     }
    //     tempNode = tempNode.next.next;
    //     let num = tempNode.next;
    //     tempNode.next = new _Node(item, num);

    // }
}

module.exports = LinkedList;