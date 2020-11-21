const LinkedList = require('./LinkedList');

const LinkedListService = {
    createLinkedList(words) {
        const list = new LinkedList;
        let arr = words;

        while (arr.length) {
            let temp = arr.pop()
            list.insertFirst(temp)
        }

        return list;
    },

    moveWord(list, num) {
        let hold = list.head;
        list.removeHead()
        return list.insertAt(hold, num)
    }

}

module.exports = LinkedListService
