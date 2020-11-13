
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
      .select('total_score', 'original', 'translation', 'correct_count', 'incorrect_count', 'memory_value', 'language.head')
      .where({ language_id })
  },

  updateWordAndHead(db, language_id, obj) {
    const { wordIncorrectCount, wordCorrectCount, totalScore, newHead, newNext, memoryVal, oldHead } = obj;
    console.log('CORRECT', wordCorrectCount)
    return db
      .from('word')
      .update({
        incorrect_count: wordIncorrectCount,
        correct_count: wordCorrectCount,
        memory_value: memoryVal,
        next: newNext
      })
      .where({ original: oldHead })
      .then(() => {
        return db
          .from('language')
          .update({
            head: newHead,
            total_score: totalScore
          })
          .where({ id: language_id })
      })

  }

}




module.exports = LanguageService
