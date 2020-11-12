
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

  updateCorrect(db, language_id, head) {
    return db
      .from('language')
      .where({ id: language_id })
      .update({ total_score: head.total_score + 1 })
      .then(() => {
        return db
          .from('word')
          .where({ original: head.original })
          .update({
            correct_count: head.correct_count + 1,
            memory_value: head.memory_value * 2
          })
      })

    //then update LL
  },

  updateIncorrect(db, head) {
    return db
      .from('word')
      .where({ original: head.original })
      .update({
        incorrect_count: head.incorrect_count + 1,
        memory_value: 1
      })
    //then update LL
  }




}

module.exports = LanguageService
