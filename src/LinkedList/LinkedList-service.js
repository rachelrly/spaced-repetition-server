const LinkedList = require('./LinkedList');

const WordList = {}

const LinkedListService = {
    createLinkedList(head, words) {
        let list = new LinkedList;
        const getWord = id => words.find(w => w.id === id)
        const addWord = word => {
            if (word.value.next === null) {
                return;
            }
            list.insertLast(word)

            return addWord(getWord(word.next))
        }
        console.log(list)
        addWord(getWord(head))

        return list;
    },
    moveWord(list, word, pos) {
        let head = list.removeHead()
        list.insertAt(head, pos)
    }

}

module.exports = {
    LinkedListService,
    WordList
};