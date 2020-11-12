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

    moveWord(list, word, pos) {
        let head = list.removeHead()
        return list.insertAt(head, pos)
    }

}

module.exports = {
    LinkedListService,
    WordList
};