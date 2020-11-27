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

## Local dev setup

If using user `rachel`:

```bash
mv example.env .env
createdb -U rachel spaced_repetition
createdb -U rachel spaced_repetition_test
```

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced_repetition_test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g on Ubuntu 18.04 probably: '/etc/postgresql/14/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
