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
  },

  getHead(db, language_id) {
    return db
      .from('word')
      .join('language', { 'language.head': 'word.id' })
      .select('word.id', 'total_score', 'original', 'translation', 'correct_count', 'incorrect_count', 'memory_value', 'language.head')
      .where({ language_id })
  },

  handleLinkedList(head, arr, pos) {

    const ll = LinkedListService.createLinkedList(head.head, arr)
    return LinkedListService.moveWord(ll, pos)

  },

  handleUpdate(db, language_id, head, arr, guess) {

    console.log('HEAD FROM LANG SERVICE', head)

    const isCorrect = guess === head.translation ? true : false

    const correct = isCorrect === true ? head.correct_count + 1 : head.correct_count
    const incorrect = isCorrect === true ? head.incorrect_count : head.incorrect_count + 1
    const total = isCorrect === true ? head.total_score + 1 : head.total_score
    const pos = isCorrect === true ? 2 : 1

    const { newHead, newNext } = this.handleLinkedList(head, arr, pos);

    return db
      .from('word')
      .update({
        incorrect_count: incorrect,
        correct_count: correct,
        memory_value: pos,
        next: newNext.id
      })
      .where('id', head.id)
      .then(() => {
        return db
          .from('language')
          .update({
            head: newHead.id,
            total_score: total
          })
          .where({ id: language_id })
          .then(() => {
            return {
              nextWord: newNext.original,
              totalScore: total,
              wordCorrectCount: correct,
              wordIncorrectCount: incorrect,
              answer: head.translation,
              isCorrect
            }
          })
      })




  }

}




module.exports = LanguageService
