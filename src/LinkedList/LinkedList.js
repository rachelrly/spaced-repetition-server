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
            console.log('moved 2 places')
            let node = this.head;
            let hold = node.next;
            const newNode = new _Node(item.value, hold);
            node.next = newNode;

            return {
                newHead: { ...this.head.value },
                beforeMoved: { ...node.value },
                moved: item.value,
                afterMoved: { ...newNode.next.value }
            }
        }

        let node = this.find(pos - 1);

        if (node.next == null) {
            console.log('moved to end')
            const newNode = new _Node(item.value, null)

            node.next = newNode;

            return {
                newHead: { ...this.head.value },
                beforeMoved: { ...node.value },
                moved: item.value,
                afterMoved: null,
            }
        }

        else {
            console.log('moved n places')
            let hold = node.next
            const newNode = new _Node(item.value, hold)
            node.next = newNode;
            return {
                newHead: { ...this.head.value },
                beforeMoved: { ...node.value },
                moved: item.value,
                afterMoved: { ...newNode.next.value }
            }
        }
    }

    find(pos) {

        let node = this.head;
        let i;

        while (node.next && i < pos) {
            node = node.next
            i++;
        }
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