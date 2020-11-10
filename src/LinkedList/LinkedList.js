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

    insertByMemoryScore(item, score) {
        if (this.head === null) {
            this.insertFirst(item);
        }

        else {
            let tempNode = this.head;

            if (tempNode.value.memory_score === 1) {
                tempNode = tempNode.next;

                let num = tempNode.next;

                tempNode.next = new _Node(item, num)
            }

            while (tempNode.value.memory_score < score && tempNode.next) {
                tempNode = tempNode.next;
            }

            let num = tempNode.next;
            tempNode.next = new _Node(item, num)
        }
    }
}

module.exports = LinkedList;