# node-utility-scripts

List of small node modules, mostly commonly used. 

Includes some stuff from [Awesome NodeJS](https://github.com/sindresorhus/awesome-nodejs) - A curated list of delightful Node.js packages and resources.

## utility (all-in-one)

- [101](https://github.com/tjmehta/101) - A modern JS utility library
- [utility](https://github.com/node-modules/utility) - A collection of useful utilities
- [utilities](https://github.com/mde/utilities/) - A classic collection of JavaScript utilities
- [utils](https://github.com/jonschlinkert/utils) - Fast, generic JavaScript/node.js utility functions.
- [mout](https://github.com/mout/mout) - Modular JavaScript Utilities

## array manipulation

- [uniq](https://github.com/mikolalysenko/uniq) - Removes duplicate items from an array in place
- [compact-array](https://github.com/miguelmota/compact-array) - Returns an array with "non-empty" values only.
- [is-array](https://github.com/retrofox/is-array) - es5 isArray
- [array-slice](https://github.com/jonschlinkert/array-slice) - Lo-dash's array-clice method. 
- [arr-diff](https://github.com/jonschlinkert/arr-diff) - Fastest implementation of array difference.
- [arr-every](https://github.com/jonschlinkert/array-every) - Returns true if the callback returns truthy for all elements in the given array.
- [arr-flatten](https://github.com/jonschlinkert/arr-flatten) - Recursively flatten an array or arrays.This is the fastest implementation of array flatten.
- [arr-union](https://github.com/jonschlinkert/arr-union) - Returns an array of unique values using strict equality for comparisons, maintaining the  same order as the provided arrays.
- [arr-unique](https://github.com/jonschlinkert/array-unique) - Return an array free of duplicate values. Very fast implementation.
- [filter-array](https://github.com/jonschlinkert/filter-array) - Iterates over the elements in an array, returning an array with only the elements for which the callback returns truthy.
- [arr-filter](https://github.com/jonschlinkert/arr-filter) - fast array filter
- [index-of](https://github.com/jonschlinkert/index-of) - Get the index of the first element in an array that returns truthy for the given value, using strict equality for comparisons.
- [arr-pluck](https://github.com/jonschlinkert/arr-pluck) - Get the value of a specified property from all elements in a collection.
- [arr-map](https://github.com/jonschlinkert/arr-map) - Faster, node.js focused alternative to JavaScript's native array map.

#OTHER TOOLS

## control-flow

- Promises
  - [bluebird](https://github.com/petkaantonov/bluebird) - A fully featured promise library with focus
    on innovative features and performance.
  - [pinkie-promise](https://github.com/floatdrop/pinkie-promise) - Promise ponyfill.
  - [pify](https://github.com/sindresorhus/pify) - Promisify a callback-style function.
- Callbacks
  - [each-async](https://github.com/sindresorhus/each-async) - Async concurrent iterator like forEach.
  - [async](https://github.com/caolan/async) - Provides straight-forward, powerful functions for
    working with asynchronicity.
  - [async-chainable](https://github.com/hash-bang/async-chainable) - Chainable, pluggable async
    functionality.
  - [after-all-results](https://github.com/watson/after-all-results) - Bundle results of async
    functions calls into one callback with all the results.
- Generators
  - [co](https://github.com/tj/co) - The ultimate generator based flow-control goodness.
  - [suspend](https://github.com/jmar777/suspend) - Generator-based control flow that plays nice with
    callbacks, promises, and thunks.
  - [bluebird-co](https://github.com/novacrazy/bluebird-co) - A set of high performance yield handlers
    for Bluebird coroutines.
- Streams
  - [highland.js](http://highlandjs.org) - Manages synchronous and asynchronous code easily, using
    nothing more than standard JavaScript and Node-like Streams.
- Channels
  - [js-csp](https://github.com/jlongster/js-csp) - Communicating sequential processes for JavaScript
    (like Clojurescript core.async, or Go).
- Other
  - [zone](https://github.com/strongloop/zone) - Provides a way to group and track resources and
    errors across asynchronous operations.


## Process management

- [PM2](https://github.com/Unitech/pm2) - Advanced Process Manager.
- [node-windows](https://github.com/coreybutler/node-windows) - Run scripts as a native Windows service and log to the Event viewer.
- [node-mac](https://github.com/coreybutler/node-mac) - Run scripts as a native Mac daemon and log to the console app.
- [node-linux](https://github.com/coreybutler/node-linux) - Run scripts as native system service and log to syslog.
- [forever](https://github.com/foreverjs/forever) - A simple CLI tool for ensuring that a given script runs continuously (i.e. forever).
- [nodemon](https://github.com/remy/nodemon) - Monitor for changes in your app and automatically restart the server.
- [supervisor](https://github.com/petruisfan/node-supervisor) - Restart scripts when they crash or restart when a `*.js` file changes.
- [Phusion Passenger](https://www.phusionpassenger.com/node_weekly) - Friendly process manager that integrates directly into Nginx.
- [naught](https://github.com/andrewrk/naught) - Process manager with zero downtime deployment.

# static site generator

- [metalsmith](http://www.metalsmith.io) - An extremely simple, pluggable static site generator.
- [wintersmith](http://wintersmith.io) - Flexible, minimalistic, multi-platform static site generator.
- [assemble](http://assemble.io) - Static site generator for Node.js, Grunt.js, and Yeoman.
- [docPad](https://github.com/docpad/docpad) - Static site generator with dynamic abilities and huge
  plugin ecosystem.


## E-mail

- [Nodemailer](https://github.com/andris9/Nodemailer) - The fastest way to handle email.
- [emailjs](https://github.com/eleith/emailjs) - Send text/HTML emails with attachments to any SMTP server.

#servers and server frameworks
- [http-server](https://github.com/indexzero/http-server) - zero config simple http server
- [express](https://github.com/strongloop/express/) - express
- [sails](http://sailsjs.org/) - Built For developers by seahorses

#beautifiers
- [esformatter](https://github.com/millermedeiros/esformatter) - ECMAScript code beautifier/formatter
- [jscs](https://github.com/jscs-dev/node-jscs/) - JavaScript Code Style checker 
- [js-beautifier](https://www.npmjs.com/package/js-beautify) - jsbeautifier.org for node
- [codepainter](https://www.npmjs.com/package/codepainter) - A JavaScript beautifier that can both infer coding style and transform code to reflect that style.

#operating system utilities

- [wifi-password](https://github.com/kevva/wifi-password) - Get current wifi password
- [dark-mode](https://github.com/sindresorhus/dark-mode) - Toggle the OS X Dark Mode from the command-line

# functional programming

- [folktale](https://github.com/folktale) - Generic Functional Programming in JS / Javascript meets DRY
- [mori](http://swannodette.github.io/mori/) A library for using ClojureScript's persistent data structures and supporting API from the comfort of vanilla JavaScript.

#useful utilities

- [cpy](https://github.com/sindresorhus/cpy) - Copy files
- [trash](https://github.com/sindresorhus/trash) - Send to trash
- [empty-trash](https://github.com/sindresorhus/empty-trash) - Empty your trash
- [public-ip](https://github.com/sindresorhus/public-ip) - find your public IP
- [vtop](https://github.com/MrRio/vtop) - More better than regular top - A graphical activity monitor for the command line
- [bcat](https://github.com/kessler/node-bcat) - A pipe to browser utility
- [pjs](https://github.com/danielstjules/pjs) - Pipeable Javascript

#git
- [js-git](https://github.com/creationix/js-git) - A JavaScript implementation of Git.


#internet stuffs
[is-up](https://github.com/sindresorhus/is-up) - Check whether a website is up or down
[torrent](https://github.com/maxogden/torrent) - download torrents with node from the CLI
[omelette](https://github.com/f/omelette) - Simple Autocompletion Helper for Node
[http-teapot](https://www.npmjs.com/package/http-teapot) - Add teapot route  
[htcpcp](https://github.com/stephen/node-htcpcp) - Hyper Text Coffee Pot Control Protocol implemented in node.js

#npm

Please refer to [Awesome NPM](https://github.com/sindresorhus/awesome-npm) for more npm utilities

- [npm-user](https://github.com/sindresorhus/npm-user)  - Get user info of a npm user
- [npm-name](https://github.com/sindresorhus/npm-name) - Check whether a package name is available on npm
- [license-checker](https://github.com/davglass/license-checker) - Check NPM package licenses if you've ever needed to see all the license info for a module and it's dependencies.

# more tools

- [webtorrent](https://github.com/feross/webtorrent) - Streaming torrent client for node & the browser
- [ReactiveX JS](http://reactivex.io/) - Reactive eXtensions

# IPFS 

"InterPlanetary File System" - a new  P2P hypermedia protocol. For more info on IPFS - https://ipfs.io/docs/getting-started/


- [IPFS](https://github.com/ipfs/specs/tree/master/repo) - IPFS JavaScript implementation entry point and roadmap 
- [ipfs on github](https://github.com/ipfs/ipfs)  -  repo for ipfs 
- [ipfs-api](https://github.com/ipfs/js-ipfs-api) A client library for the IPFS HTTP API, implemented in JavaScript.

# tutorials how to make nodejs CLI utilities
- http://cruft.io/posts/node-command-line-utilities/
- http://mohammedlakkadshaw.com/blog/command_line_apps_in_node.js.html
- http://javascriptplayground.com/blog/2015/03/node-command-line-tool/
