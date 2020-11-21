const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const languageRouter = express.Router()
const jsonBodyParser = express.json()
const { LinkedListService } = require('../LinkedList/LinkedList-service')


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

      let lang = await LanguageService.getLanguageHead(
        req.app.get('db'),
        req.language.id
      )

      headId = lang.headId ? lang.headId : 1

      const [head] = await LanguageService.getHead(
        req.app.get('db'),
        headId
      )

      res
        .status(200)
        .json({
          nextWord: head.original,
          totalScore: lang.total_score,
          wordCorrectCount: head.correct_count,
          wordIncorrectCount: head.incorrect_count
        })

    } catch (error) {
      next(error)
    }
  })

languageRouter
  .route('/guess')
  .post(jsonBodyParser, async (req, res, next) => {

    const { guess } = req.body;

    if (!guess) {
      res
        .status(400)
        .json({ error: "Missing 'guess' in request body" })
        .end()
    }

    try {

      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      )

      const update = await LanguageService.handleGuess(
        req.app.get('db'),
        req.language.id,
        words,
        guess
      )

      console.log(update)
      return res
        .status(200)
        .json({ ...update })

    } catch (error) {

      next(error)

    }
  })

module.exports = languageRouter
