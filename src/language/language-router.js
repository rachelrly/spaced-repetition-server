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

      res.json({
        nextWord: head.original,
        totalScore: head.total_score,
        wordCorrectCount: head.correct_count,
        wordIncorrectCount: head.incorrect_count
      })

      next()
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

      let [head] = await LanguageService.getHead(
        req.app.get('db'),
        req.language.id
      )

      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id
      )
      const isCorrect = guess === head.translation ? true : false

      const ll = LinkedListService.createLinkedList(head.head, words)
      const memoryVal = isCorrect === true ? head.memory_value * 2 : 1

      let moved = LinkedListService.moveWord(ll, memoryVal)

      //add id to indicate vs object
      //objects and pointers
      //ROUTER SHOULD DEAL WITH OBJECTS

      let newHead = LinkedListService.getHead(ll)

      let data = {};

      if (isCorrect === true) {

        data = {
          wordCorrectCount: head.correct_count + 1,
          wordIncorrectCount: head.incorrect_count,
          totalScore: head.total_score + 1,
          newHead: moved.head,
          newNext: moved.next,
          memoryVal,
          oldHead: head.original
        }
      }
      else if (isCorrect === false) {

        data = {
          wordIncorrectCount: head.incorrect_count + 1,
          wordCorrectCount: head.correct_count,
          totalScore: head.total_score,
          newHead: newHead.id,
          newNext: moved.next,
          memoryVal,
          oldHead: head.original
        }
      }

      // function display(list) {
      //   let thisNode = list.head;
      //   let output = "";
      //   while (thisNode !== null) {
      //     if (thisNode !== list.head) {
      //       output += " -> ";
      //     }
      //     output += `OG: ${thisNode.value.original}, ID: ${thisNode.value.id}, NEXT: ${thisNode.value.next}`;
      //     thisNode = thisNode.next;
      //   }

      //   console.log(output)
      //   return output;
      // }



      await LanguageService.updateWordAndHead(
        req.app.get('db'),
        req.language.id,
        { ...data }
      )




      return res
        .status(200)
        .json({
          nextWord: newHead.original,
          totalScore: data.totalScore,
          wordCorrectCount: data.wordCorrectCount,
          wordIncorrectCount: data.wordIncorrectCount,
          answer: head.translation,
          isCorrect
        })
    } catch (error) {

      next(error)

    }
  })

module.exports = languageRouter
