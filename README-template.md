<h1 align="center"> Be the hero - API (Backend) </h1>

<p align="center"> This is my personal implementation of the app be-the-hero from the omnistack 11
make by  <a href="https://rocketseat.com.br/"> rocketseat. </a></p>

<h3> Jest test coverage reports badges. </h3>

| Statements                                    | Branches                                  | Functions                                   | Lines                               |
| --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| ![Statements](#statements# 'Make me better!') | ![Branches](#branches# 'Make me better!') | ![Functions](#functions# 'Make me better!') | ![Lines](#lines# 'Make me better!') |

## :books: Documentation :books:

### Full Project

Here is a link to the [project docs.](https://trello.com/b/UWFHM6CK/omnistack11-be-the-hero)

### API

Here is a link to the [api docs.](https://app.swaggerhub.com/apis/rafaelcascalho/Be-the-hero-api-docs/1.0.0)

## Prerequisites

### :warning: Required :warning:

Node current LTS

```
$ node -v
v12.16.1
```

Yarn version 1.22.4 or npm (latest is advised)

```
$ yarn -v
1.22.4
```

Postgres version 12.2

### Optional :glasses:

Docker and docker-compose

```
$ docker -v
Docker version 19.03.8, build afacb8b7f0

$ docker-compose -v
docker-compose version 1.25.4, build 8d51620a
```

## :construction: Instalation :construction:

1. Install `yarn` or `npm`
2. Install the `postgres` dbms in your machine OR docker (composer is also optional)

### Optional :glasses:

If you want to execute the `knex` commands with a shorter command, just install the `npx` module
globaly.
So you'll be able to run

```
$ npx knex command
```

Instead of

```
$ node_modules/.bin/knex command
```

## :rocket: Getting started :rocket:

### Set up and run :woman_running:

1. Clone the repository and enter the repository directory
   ```
   $ git clone git@github.com:rafaelcascalho/be-the-hero-backend.git
   Cloning into 'be-the-hero-backend'...
   remote: Enumerating objects: 112, done.
   remote: Counting objects: 100% (112/112), done.
   remote: Compressing objects: 100% (73/73), done.
   remote: Total 112 (delta 41), reused 104 (delta 33), pack-reused 0
   Receiving objects: 100% (112/112), 151.70 KiB | 626.00 KiB/s, done.
   Resolving deltas: 100% (41/41), done.
   $ cd be-the-hero-backend
   ```
2. Set up the database

   1. Run the postgres server
   2. Create a database with a name of your choice
   3. Create a `.env` file based on the `.env.example` file, and fill it with your database information
   4. Install the project dependencies with one of the commands below

   ```
   $ yarn install
   ```

3. After that, we need to run the migrations with the following command

   ```
   $ node_modules/.bin/knex migrate:latest
   ```

   To check if your migrations were successfull just run the command

   ```
   $ node_modules/.bin/knex migrate:status
   ```

   And you should see and outcome like this one

   ```
   Found 2 Completed Migration file/files.
   20200328191618_create_ongs.js
   20200328192842_create_incidents.js
   No Pending Migration files Found.
   ```

4. After that's done, you can just check if your `development` environment is running using the command

   ```
   $ yarn dev
   ```

5. That's it! You're all set. :clinking_beer_mugs:

## :seedling: Seeding the database :seedling:

To seed the database just run the command

```
$ yarn seed
```

## :test_tube: Running the tests :test_tube:

To run the tests just use the command

```
$ yarn test
```

To run the tests and generate the coverage report run the command

```
$ yarn test:cov
```

## :shield: Checking dependencies :shield:

To check if your dependecies have vulnerabilities just run the command

```
$ yarn sec
```

Case snyk finds any problems, you can run the wizard to manage them one by one with the command

```
$ yarn sec:wizard
```

To access the coverage reports generated, you can just access the `/coverage/lcov-report/index.html`
from your browser, in the just generated folder `coverage` in the root of the project.

## Deployment

This project is currently deployed at [heroku PAAS](http://heroku.com/).
Case you're interested in doing the same just [check out this tutorial](https://devcenter.heroku.com/articles/deploying-nodejs).

### :whale: IF you're using docker with docker-compose :whale:

This is an example of my docker-compose file

```
version: "3"

services:
psql:
image: postgres
restart: always
environment:
POSTGRES_PASSWORD: password
volumes: - ./data:/var/lib/postgresql/data
ports: - 5455:5432
```

## Built With

- [NodeJs](https://nodejs.org/) - Backend environment for javascript
- [Knex](http://knexjs.org/) - SQL query builder
- [Celebrate](https://www.npmjs.com/package/celebrate) - Request validator
- [Dotenv](https://www.npmjs.com/package/dotenv) - Env files loader
- [Winston](https://github.com/winstonjs/winston) - Logger
- [Cors](https://www.npmjs.com/package/cors) - Cors enabler for express
- [Jest](https://jestjs.io/) - Automated tests library
- [Chance](https://chancejs.com/) - Random data generator for tests
- [PM2](https://pm2.keymetrics.io/) - Process manager for deployment
- [Snyk](https://snyk.io/) - Dependency security checker
- [Helmet](https://helmetjs.github.io/) - Headers setter for security for express
- [Eslint](https://eslint.org/) - Code linting tool
- [Prettier](https://prettier.io/) - Code formatter
- [Editorconfig](https://editorconfig.org/) - Code style enforcer
- [Docker](https://www.docker.com/) - Virtualizer of containers
- [Docker Compose](https://docs.docker.com/compose/) - Containers manager
- [Postgres](https://www.postgresql.org/) - Database
