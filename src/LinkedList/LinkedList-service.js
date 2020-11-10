const LinkedList = require('./LinkedList');
const LanguageService = require('../language/language-service');



function createLinkedList(head, arr) {
    //get head, create LL with head

    const list = new LinkedList;

    LanguageService.getLanguageWords()
        .then(s => s.forEach(w => LinkedList.method(w)))







}

createLinkedList();
