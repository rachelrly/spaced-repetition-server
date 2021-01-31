# Spaced Repetition API

This is a repository for the Spaced Repetition API--a language learning API that uses the spaced repetition technique.

Live site: [Here](https://spaced-repetition-dun.vercel.app/)

Client repository: [Here](https://github.com/Rachanastasia/spaced-repetition-client)

## Images

![]('screenshot1.jpg')
![]('screenshot2.jpg')

## Codebase

### Linked List

This project features the linked list data structure, which is implemented through a JavaScript class in `src/LinkedList/LinkedList.js`.

The LinkedList class contains methods to insert nodes first, last, or at a specified position.

`LinkedList-service.js` contains methods to handle the piece movement.

### Language

#### GET /api/language

Gets all words for given language

#### GET /api/language/head

Get's word and head of linked list.

This endpoint is only called from the client on the first word. Otherwise, the next word is returned in the response object of the guess.

#### POST /api/language/guess

This endpoint accepts a guess and validates answer.

Every time this endpoint is called, a linked list is built recursively based on each word's next pointer. Then the linked list is traversed with the methods, and the nodes are appropriately moved.

The linked list returns an object, which tells which words need to be updated in the database.

This endpoint returns the current score after the guess, if the guess was correct, the next word, and data about the next word.

### Auth

#### POST api/auth/token

Posts authorization for login

#### PUT api/auth/token

Sends JWT auth token

### User

#### POST api/user

Posts username and password for validation

### Test

This project was created using TDD with these tests, which were provided by Thinkful.
