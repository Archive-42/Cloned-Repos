# generator-backend-scaffolder

[![CircleCI](https://img.shields.io/circleci/project/suddi/generator-backend-scaffolder/master.svg)](https://circleci.com/gh/suddi/generator-backend-scaffolder)
[![codecov](https://codecov.io/gh/suddi/generator-backend-scaffolder/branch/master/graph/badge.svg)](https://codecov.io/gh/suddi/generator-backend-scaffolder)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ba6244dc47f34661a99cefb159d93bcb)](https://www.codacy.com/app/Suddi/generator-backend-scaffolder)
[![npm](https://img.shields.io/npm/v/generator-backend-scaffolder.svg)](https://www.npmjs.com/package/generator-backend-scaffolder)
[![npm](https://img.shields.io/npm/dt/generator-backend-scaffolder.svg)](https://www.npmjs.com/package/generator-backend-scaffolder)
[![Greenkeeper badge](https://badges.greenkeeper.io/suddi/generator-backend-scaffolder.svg)](https://greenkeeper.io/)
[![David](https://img.shields.io/david/suddi/generator-backend-scaffolder.svg)](https://david-dm.org/suddi/generator-backend-scaffolder)
[![David](https://img.shields.io/david/dev/suddi/generator-backend-scaffolder.svg)](https://david-dm.org/suddi/generator-backend-scaffolder?type=dev)
[![license](https://img.shields.io/github/license/suddi/generator-backend-scaffolder.svg)](https://raw.githubusercontent.com/suddi/generator-backend-scaffolder/master/LICENSE)

[![codecov](https://codecov.io/gh/suddi/generator-backend-scaffolder/branch/master/graphs/commits.svg)](https://codecov.io/gh/suddi/generator-backend-scaffolder)

Yeoman backend scaffolder for Node.js modules.

`generator-backend-scaffolder` will establish the following:
- editor configuration (with [editorconfig](http://editorconfig.org/))
- git (with [gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore))
- linting (with [eslint](https://www.npmjs.com/package/eslint) and [eslint-config-suddi](https://www.npmjs.com/package/eslint-config-suddi))
- testing (with [mocha](https://www.npmjs.com/package/mocha))
- doctest (with [jsdoctest](https://www.npmjs.com/package/jsdoctest))
- code coverage (with [istanbul](https://www.npmjs.com/package/istanbul) and [codecov](https://codecov.io/))
- CI (either [TravisCI](https://travis-ci.org/), [CircleCI](https://circleci.com/) or none)
- dependency management (with [David-DM](https://david-dm.org/))
- licensing (with [generator-license](https://www.npmjs.com/package/generator-license))
    - Supported licenses:
        - [Apache 2 License](http://choosealicense.com/licenses/apache/)
        - [MIT License](http://choosealicense.com/licenses/mit/)
        - [FreeBSD License](http://choosealicense.com/licenses/bsd/)
        - [NewBSD License](http://choosealicense.com/licenses/bsd-3-clause/)
        - [ISC License](http://en.wikipedia.org/wiki/ISC_license)
        - [No License](http://choosealicense.com/licenses/no-license/)
        - [Unlicense](http://unlicense.org/)

````
npm install -g generator-backend-scaffolder
````

## Usage

````
yo backend-scaffolder
````

Once run, `generator-backend-scaffolder` will generate the following file structure:

````
.
├── test
│   └── options
│       ├── default.opts
│       └── doctest.opts
├── .editorconfig
├── .eslintignore
├── .gitignore
├── .istanbul.yml
├── .travis.yml (if "TravisCI" option is chosen)
├── circle.yml (if "CircleCI" option is chosen)
├── README.md
└── package.json
````

No `dependencies` will be installed, the following `devDependencies` will be installed:
- eslint
- eslint-config-suddi
- husky (for pre-push hooks)
- istanbul
- jsdoctest
- mocha
- nsp (for security checks)
- ntl (for an interactive CLI for `npm tasks`)

Additionally, the following `npm tasks` will also be setup and can be triggered as follows:
- `npm run check-coverage`
    - Ensure code coverage meets code coverage standards mentioned in `.istanbul.yml`
- `npm run coverage`
    - Run `mocha` tests with `istanbul` code coverage generated
- `npm run doctest`
    - Run `jsdoctest` tests with `mocha`, no code coverage will be generated
- `npm run lint`
    - Run `eslint` linter on project
- `npm run prepush`
    - Run git pre-push hook, will be run automatically when pushing to remote repository
- `npm run security-check`
    - Run a security check using the `Node Security (nsp)` module
- `npm start`
    - Run `Node Task List (ntl)` module to create interactive menu for `npm tasks`
- `npm test`
    - Run a compiled list of tests

