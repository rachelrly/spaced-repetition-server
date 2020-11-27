const LinkedList = require('./LinkedList');

const LinkedListService = {
    createLinkedList(words, head) {
        const list = new LinkedList;
        let arr = words;

        let sortedWords = []
        const getWordById = id => words.find(a => a.id === id)

        function addWordtoList(word) {
            list.insertLast(word)

            if (word.next === null) {
                return null;
            }

            const next = getWordById(word.next)
            addWordtoList(next)
        }

        addWordtoList(getWordById(head))

        return list;
    },

    moveWord(list, num) {
        let hold = list.head.value;
        list.removeHead()

        return list.insertAt(hold, num)
    }

}

module.exports = LinkedListService
