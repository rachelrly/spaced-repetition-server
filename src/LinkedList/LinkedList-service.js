const LinkedList = require('./LinkedList');

const WordList = new LinkedList;

const LinkedListService = {
    createLinkedList(list, head, words) {

        const getWord = id => words.find(w => w.id === id)

        const addWord = word => {
            if (!word.next) {
                return;
            }

            const nextWord = getWord(word.next)

            list.insertLast(word, nextWord)

            return addWord(nextWord)
        }

        let listHead = getWord(head)

        let listHeadNext = getWord(listHead.next)

        list.insertFirst(listHead, listHeadNext)

        addWord(listHeadNext)

        return list;
    },

    moveWord(list, word, bool) {
        console.log('bool in LL-service', bool)
        const memory_value = bool === true ? word.memory_value * 2 : 1
        let head = list.removeHead()
        let next = list.insertAt(head, memory_value)
        return {
            old: {
                head: head.value.id,
                next: next,
                memory_value,
            },
            newHead: list.head.value.id
        }
    }

}

module.exports = {
    LinkedListService,
    WordList
};