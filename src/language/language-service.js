const LinkedListService = require('../LinkedList/LinkedList-service')

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
      .orderBy('next', 'asc')
  },

  getHead(db, id) {
    return db
      .from('word')
      .select(
        'id',
        'original',
        'translation',
        'correct_count',
        'incorrect_count',
        'memory_value'
      )
      .where({ id })
  },
  getLanguageHead(db, language_id) {
    return db
      .from('language')
      .where({ id: language_id })
      .select('head', 'total_score')
  },

  async handleGuess(db, language_id, words, guess) {
    const ll = LinkedListService.createLinkedList(words)

    if (guess == ll.head.value.original) {
      let num = ll.head.value.memory_value * 2;

      let newVals = LinkedListService.moveWord(ll, num);
      console.log(newVals)
      await db
        .from('word')
        .update({

        })
        .where({})


      /* Update new head and total score for correct answer */

      // let total_score = await db
      //   .select('total_score')
      //   .from('language')
      //   .where({ id: language_id })

      // total_score = total_score + 1;

      // return await db
      //   .from('language')
      //   .update({
      //     head: newHead.id,
      //     total_score
      //   })
      //   .where({ id: language_id })

    }
    else {

      const newVals = LinkedListService.moveWord(ll, 1);
      console.log(newVals)
      //move one space back
      //adjust place in LL
      //change values in the db
      //new head
      //new node.prev.next
      //new node.next


      /* Update new head for incorrect answer */
      // return await db
      //   .from('language')
      //   .update({
      //     head: newHead.id
      //   })
      //   .where({ id: language_id })
    }
  },

}

// handleUpdate(db, language_id, head, arr, guess) {

//   const isCorrect = guess === head.translation ? true : false

//   const correct = isCorrect === true ? head.correct_count + 1 : head.correct_count
//   const incorrect = isCorrect === true ? head.incorrect_count : head.incorrect_count + 1
//   const total = isCorrect === true ? head.total_score + 1 : head.total_score
//   const pos = isCorrect === true ? 2 : 1

//   const { newHead, newNext } = this.handleLinkedList(head, arr, pos);

//   //edit different notes loop over list and check over
//   //transactions sql group queries 

//   return db
//     .from('word')
//     .update({
//       incorrect_count: incorrect,
//       correct_count: correct,
//       memory_value: pos,
//       next: newNext.id
//     })
//     .where('id', head.id)
//     .then(() => {
//       return db
//         .from('language')
//         .update({
//           head: newHead.id,
//           total_score: total
//         })
//         .where({ id: language_id })
//         .then(() => {
//           return {
//             nextWord: newNext.original,
//             totalScore: total,
//             wordCorrectCount: correct,
//             wordIncorrectCount: incorrect,
//             answer: head.translation,
//             isCorrect
//           }
//         })
//     })
// }






module.exports = LanguageService
