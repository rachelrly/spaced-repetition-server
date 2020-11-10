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
      .join('language', 'word')
      .select(
        'language.head',
        'language.total_score',
        'word.original',
        'word.correct_count',
        'word.incorrect_count'
      )
      .where({ language_id })
  }
}

module.exports = LanguageService
