const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const languageRouter = express.Router()
const jsonBodyParser = express.json()
const { LinkedListService, WordList } = require('../LinkedList/LinkedList-service')
console.log('WORDLIST', WordList)

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {

    try {
      const [head] = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id
      )

      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      )
      console.log(head.head)

      if (!WordList.head || WordList.head === null) {
        LinkedListService.createLinkedList(WordList, head.head, words)
      }


      res.json({
        nextWord: head.original,
        wordCorrectCount: head.correct_count,
        wordIncorrectCount: head.incorrect_count,
        answer: head.translation,
        totalScore: head.total_score
      })

      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .route('/guess')
  .post(jsonBodyParser, async (req, res, next) => {
    const { answer } = req.body;
    try {
      const [head] = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id
      )
      console.log('answer', req.body.answer, 'correct', head.translation)

      if (answer == head.translation) {
        const h = await LanguageService.updateCorrect(
          req.app.get('db'),
          req.language.id,
          head
        )
        return res
          .status(200)
          .json({ answer: true })
          .end()

      } else {
        const h = await LanguageService.updateIncorrect(
          req.app.get('db'),
          head
        )
        return res
          .status(200)
          .json({ answer: false })
          .end()
      }

    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter
