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
      .where('word.id', id)
      .join('language', { 'word.language_id': 'language.id' })
      .select(
        'word.id',
        'word.original',
        'word.translation',
        'word.correct_count',
        'word.incorrect_count',
        'word.memory_value',
        'language.total_score'
      )

  },
  getLanguageHead(db, language_id) {
    return db
      .from('language')
      .where({ id: language_id })
      .select('head', 'total_score')
  },

  async handleGuess(db, language_id, words, guess) {
    const ll = LinkedListService.createLinkedList(words)


    //If correct
    if (guess == ll.head.value.translation) {
      console.log('answered correctly')

      let num = ll.head.value.memory_value * 2;

      let nodes = LinkedListService.moveWord(ll, num);

      const count = Number(nodes.moved.correct_count) + 1;

      let [{ total_score }] = await db
        .select('total_score')
        .from('language')
        .where({ id: language_id })

      const score = Number(total_score) + 1;

      await db
        .from('word')
        .where({ id: nodes.moved.id })
        .update({
          correct_count: count,
          next: nodes.afterMoved.id,
          memory_value: num
        })

      await db
        .from('word')
        .update({
          next: nodes.beforeMoved.id
        })
        .where({ id: nodes.beforeMoved.id })

      /* Update new head and total score for correct answer */


      await db
        .from('language')
        .update({
          head: nodes.newHead.id,
          total_score: score
        })
        .where({ id: language_id })

      return {
        nextWord: nodes.newHead.original,
        wordIncorrectCount: nodes.newHead.incorrect_count,
        wordCorrectCount: nodes.newHead.correct_count,
        answer: nodes.moved.translation,
        totalScore: score,
        isCorrect: true
      }

    }
    else {

      let nodes = LinkedListService.moveWord(ll, 1);

      const count = Number(nodes.moved.incorrect_count) + 1;

      let [{ total_score }] = await db
        .select('total_score')
        .from('language')
        .where({ id: language_id })

      const score = Number(total_score)

      await db
        .from('word')
        .where({ id: nodes.moved.id })
        .update({
          incorrect_count: count,
          next: nodes.afterMoved.id,
          memory_value: 1
        })


      await db
        .from('word')
        .update({
          next: nodes.beforeMoved.id
        })
        .where({ id: nodes.beforeMoved.id })


      await db
        .from('language')
        .update({
          head: nodes.newHead.id
        })
        .where({ id: language_id })

      return {
        nextWord: nodes.newHead.original,
        wordIncorrectCount: nodes.newHead.incorrect_count,
        wordCorrectCount: nodes.newHead.correct_count,
        answer: nodes.moved.translation,
        totalScore: score,
        isCorrect: false
      }
    }
  },

}





module.exports = LanguageService
