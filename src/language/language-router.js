const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const languageRouter = express.Router()
const jsonBodyParser = express.json()

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
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    console.log('REQUEST BODY', req.body)
    const { answer } = req.body;
    try {
      const [head] = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id
      )

      const h = await LanguageService.updateCorrect(
        req.app.get('db'),
        req.language.id,
        head
      )
      return res
        .status(200)
        .end()

      // } else {
      //   const h = await LanguageService.updateIncorrect(
      //     req.app.get('db'),
      //     head
      //   )

      //   return res
      //     .status(200)
      //     .end()
      // }

    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter
