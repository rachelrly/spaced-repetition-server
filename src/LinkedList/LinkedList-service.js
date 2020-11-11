const LinkedList = require('./LinkedList');

const LinkedListService = {
    createLinkedList(head, words) {
        let list = new LinkedList;
        const getWord = id => words.find(w => w.id === id)
        const addWord = word => {
            if (word.next === null) {
                return;
            }
            list.insertLast(word)

            return addWord(getWord(word.next))
        }

        addWord(getWord(head))

        return list;
    },
    moveCorrectWord(list, num) {
        let node = list.head;
        while (node.value.memory_value <= num || node.next === null) {
            node = node.next
            console.log(node.value)



        }

        console.log(node.value, num)

        // let hold = node.next

        // node.next = node.next.next
        // node.value.next = node.next.value.id

        // hold.value.next = node.value.id

        // console.log(node.value.memory_value)

        // list.insertFirst(hold, node)








    },
    moveIncorrectWord(list) {
        let node = list.head;
        let hold = node.next

        node.next = node.next.next
        node.value.next = node.next.value.id

        hold.value.next = node.value.id

        console.log(node.value.memory_value)

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
    { id: 1, language_id: 1, original: "ante", translation: "Before", next: 2, memory_value: 1 },
    { id: 2, language_id: 1, original: "contra", translation: "Opposite, against, contrary to", next: 3, memory_value: 1 },
    { id: 3, language_id: 1, original: "quia", translation: "Because", next: 4, memory_value: 1 },
    { id: 4, language_id: 1, original: "Solus", translation: "Alone, only, lonely, single", next: 5, memory_value: 2 },
    { id: 5, language_id: 1, original: "Totus", translation: "All, whole, entire", next: 6, memory_value: 4 },
    { id: 6, language_id: 1, original: "Dicere", translation: "To say", next: null, memory_value: 8 },
]


let listy = LinkedListService.createLinkedList(2, arr)


LinkedListService.moveCorrectWord(listy, 3)





// const ll = LinkedListService.createLinkedList(1, arr)
// console.log('BEFORE FUNC', ll)

// display(ll)

// ll.insertSecond()
// display(ll)

module.exports = {
    LinkedListService
};