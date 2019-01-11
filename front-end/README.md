# Hello World App - Front End

## Getting started

* Make sure you have fulfilled the [prerequisites](#prerequisites).
* Run `yarn install` to install all dependencies.

## Development workflow

* While developing, you can run a local server using `yarn start`.
This will start a server on http://localhost:9090.
* To create a static HTML5 app build, run `yarn build`.
The app will be built into the `dist/` directory.
* To run all unit tests once, run `yarn test:unit`.
* To run all unit tests continuously, run `yarn test:watch`.
* To run integration tests, run `yarn test:e2e`.
* To run all tests, run `yarn test`.

## Linting

Code is linted with [ESLint](https://eslint.org/) and [stylelint](https://stylelint.io/).
You can run both linters manually using `yarn lint`.

## Prerequisites

### General

* Node.js >=6 + NPM, for the build system
* Chrome v59.x or higher to run the tests headless
* Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)
