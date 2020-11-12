
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
    const { old, newHead, isCorrect, head } = obj;
    console.log(obj)
    if (isCorrect === true) {
      return db
        .from('word')
        .update({
          total_score: head.total_score + 1,
          correct_count: head.correct_count + 1,
          memory_value: old.memory_value,
          next: old.next
        })
        .where({ 'id': old.head })
        .then(() => {
          return db
            .from('language')
            .update({
              head: newHead
            })
            .where({ id: language_id })
        })
    }
    else if (isCorrect === false) {
      console.log(isCorrect)
      return db
        .from('word')
        .update({
          incorrect_count: head.incorrect_count + 1,
          memory_value: old.memory_value,
          next: old.next
        })
        .where({ id: old.head })
        .then(() => {
          return db
            .from('language')
            .update({
              head: newHead
            })
            .where({ id: language_id })
        })

    }

  }


}

module.exports = LanguageService
