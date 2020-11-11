const LinkedList = require('./LinkedList');

let WordList = new LinkedList;

const LinkedListService = {
    createLinkedList(head, words) {
        const getWord = id => words.find(w => w.id === id)

        const addWord = word => {
            if (word.next === null) {
                return;
            }
            WordList.insertLast(word)

            return addWord(getWord(word.next))
        }

        addWord(getWord(head))

        return WordList;
    },
    moveCorrectWord(num) {









    },
    moveIncorrectWord(list) {
        let node = list.head;
        let hold = node.next

        node.next = node.next.next
        node.value.next = node.next.value.id

        hold.value.next = node.value.id

        list.insertFirst(hold, node)

    }

}



















// function display(list) {
//     let thisNode = list.head;
//     while (thisNode.next) {
//         console.log('NODE:', thisNode, 'NEXT:', thisNode.next)
//         thisNode = thisNode.next;
//     }

//     return true;




const n = { id: 7, language_id: 1, original: "Videre", translation: "To look, see", next: null }
const arr = [
    { id: 1, language_id: 1, original: "ante", translation: "Before", next: 2 },
    { id: 2, language_id: 1, original: "contra", translation: "Opposite, against, contrary to", next: 3 },
    { id: 3, language_id: 1, original: "quia", translation: "Because", next: 4 },
    { id: 4, language_id: 1, original: "Solus", translation: "Alone, only, lonely, single", next: 5 },
    { id: 5, language_id: 1, original: "Totus", translation: "All, whole, entire", next: 6 },
    { id: 6, language_id: 1, original: "Dicere", translation: "To say", next: null },
]


LinkedListService.createLinkedList(1, arr)


LinkedListService.moveIncorrectWord(WordList)

console.log('SECOND', WordList)




// const ll = LinkedListService.createLinkedList(1, arr)
// console.log('BEFORE FUNC', ll)

// display(ll)

// ll.insertSecond()
// display(ll)

module.exports = {
    WordList,
    LinkedListService
};