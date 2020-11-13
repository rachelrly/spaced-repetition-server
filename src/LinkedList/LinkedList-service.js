const LinkedList = require('./LinkedList');

const LinkedListService = {
    createLinkedList(head, words) {

        const list = new LinkedList;

        const getWord = id => words.find(w => w.id === id)

        const addWord = word => {
            if (!word) {
                return;
            }

            const nextWord = getWord(word.next) ? getWord(word.next) : null

            list.insertLast(word, nextWord)

            return addWord(nextWord)
        }
        console.log('about to call get word with head', head)
        let listHead = getWord(head)

        console.log('get word returned, listHead', listHead)
        let listHeadNext = getWord(listHead.next) ? getWord(listHead.next) : null

        list.insertFirst(listHead, listHeadNext)

        addWord(listHeadNext)

        return list;
    },

    moveWord(list, num) {
        let hold = list.head;
        list.removeHead()
        return list.insertAt(hold, num)
    },

    getHead(list) {
        return list.head.value
    }

}

module.exports = LinkedListService
