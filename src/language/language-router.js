const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const languageRouter = express.Router()
const jsonBodyParser = express.json()
const { LinkedListService, WordList } = require('../LinkedList/LinkedList-service')


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

      if (!WordList.head) {
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

      const isCorrect = answer == head.correct ? true : false
      let moved = await LinkedListService.moveWord(WordList, answer, isCorrect)

      LanguageService.updateWordAndHead(
        req.app.get('db'),
        req.language.id,
        { ...moved, isCorrect, head }
      ).then(() => {
        return res
          .status(200)
          .json({ answer: isCorrect })
          .end()
      })
    } catch (error) {

      next(error)
    }
  })

module.exports = languageRouter
