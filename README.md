<h1 align="center"> Be the hero - API (Backend) </h1>

<p align="center"> This is my personal implementation of the app be-the-hero from the omnistack 11
make by  <a href="https://rocketseat.com.br/"> rocketseat. </a></p>

<h3> Jest test coverage reports badges. </h3>

| Statements                                                                                      | Branches                                                                                 | Functions                                                                                      | Lines                                                                                      |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/Coverage-93.71%25-brightgreen.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-81.25%25-yellow.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-95.83%25-brightgreen.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-93.71%25-brightgreen.svg 'Make me better!') |

## Documentation
### Full Project
Here is a link to the[project docs.](https://trello.com/b/UWFHM6CK/omnistack11-be-the-hero)

### API
Here is a link to the [api docs.](https://app.swaggerhub.com/apis/rafaelcascalho/Be-the-hero-api-docs/1.0.0)

## Prerequisites
### Required
- node v12.16.1
- yarn v1.22.4 or npm (latest is advised)
- postgres v12.2

### Optional
- docker v19.03.8, build afacb8b7f
- docker-compose v1.25.4, build 8d51620a

## Instalation
1. Install `yarn` or `npm`
2. Install the `postgres` dbms in your machine OR docker (composer is also optional)

### Optional
If you want to execute the `knex` commands with a shorter command, just install the `npx` module
globaly.
So you'll be able to run
```
npx knex command
```

Instead of
```
node_modules/.bin/knex command
```

## Getting started
### Set up
1. Set up the database
   1. Run the postgres server
   2. Create a database with a name of your choice
2. Create a `.env` file based on the `.env.example` file, and fill it with your database information
3. Install the project dependencies with one of the commands below
    ```
    yarn install
    ```
4. After that, we need to run the migrations with the following command
    ```
    node_modules/.bin/knex migrate:latest
    ```

    To check if your migrations were successfull just run the command
    ```
    node_modules/.bin/knex migrate:status
    ```

    And you should see and outcome like this one
    ```
    Found 2 Completed Migration file/files.
    20200328191618_create_ongs.js
    20200328192842_create_incidents.js
    No Pending Migration files Found.
    ```
5. After that's done, you can just check if your `development` environment is running using the command
    ```
    yarn dev
    ```
6. That's it! You're all set.

## Running the tests
To run the tests just use the command
```
yarn test
```
To run the tests and generate the coverage report run the command
```
yarn test:cov
```
To access the coverage reports generated, you can just access the `/coverage/lcov-report/index.html`
from your browser, in the just generated folder `coverage` in the root of the project.

## Deployment
This project is currently deployed at [heroku PAAS](http://heroku.com/).
Case you're interested in doing the same just [check out this tutorial](https://devcenter.heroku.com/articles/deploying-nodejs).

### IF you're using docker with docker-compose
This is an example of my docker-compose file
```
version: "3"

services:
  psql:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - ./data:/var/lib/postgresql/data
    ports:
      - 5455:5432
```
