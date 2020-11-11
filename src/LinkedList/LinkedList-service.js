const LinkedList = require('./LinkedList');

function display(list) {
    let thisNode = list.head;
    while (thisNode.next) {
        console.log('NODE:', thisNode, 'NEXT:', thisNode.next)
        thisNode = thisNode.next;
    }

    return true;
}
const LinkedListService = {
    createLinkedList(head, words) {
        let list = new LinkedList;

        const getWord = id => words.find(w => w.id === id)

        const addWord = word => {
            if (word.next === null) {
                return;
            }
            list.insertLast(word)
            console.log(list)
            console.log(word)
            return addWord(getWord(word.next))
        }

        addWord(getWord(head))

        return list;
    },

    // moveElement(list, val) {
    //     if (val === 1) {
    //         let temp = list.head.next
    //         list.head = 

    //     }




    // }



}
const n = { id: 7, language_id: 1, original: "Videre", translation: "To look, see", next: null }
const arr = [
    { id: 1, language_id: 1, original: "ante", translation: "Before", next: 2 },
    { id: 2, language_id: 1, original: "contra", translation: "Opposite, against, contrary to", next: 3 },
    { id: 3, language_id: 1, original: "quia", translation: "Because", next: 4 },
    { id: 4, language_id: 1, original: "Solus", translation: "Alone, only, lonely, single", next: 5 },
    { id: 5, language_id: 1, original: "Totus", translation: "All, whole, entire", next: 6 },
    { id: 6, language_id: 1, original: "Dicere", translation: "To say", next: null },
]

const ll = LinkedListService.createLinkedList(1, arr)
console.log('BEFORE FUNC', ll)

display(ll)

// ll.insertSecond()
// display(ll)

console.log('AFTER FUNC', ll)
module.exports = LinkedListService;