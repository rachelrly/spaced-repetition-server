# Spaced Repetition API

This is a repository for the Spaced Repetition API--a language learning API that uses the spaced repetition technique.

Live site: [Here](https://spaced-repetition-dun.vercel.app/)

Client repository: [Here](https://github.com/Rachanastasia/spaced-repetition-client)

## API Endpoints

### /api/language

#### GET /api/language

Gets all words for given language

#### GET /api/language/head

Get's word and head of linked list

#### POST /api/language/guess

Accepts req.body.guess and validates answer. Updates database and responds with next word and updated score

### /api/auth

#### POST api/auth/token

Posts authorization for login

#### PUT api/auth/token

Sends JWT auth token

### /api/user

#### POST api/user

Posts username and password for validation
