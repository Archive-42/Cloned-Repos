# Bulletproof node.js project architecture 🛡️

> A simple yet powerful project architecture for node.js REST APIs 💎

17 April 2019/[Node.js](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/tags/node-js/)

![](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/924a9e92c79c3a5b6c56b6f2dbae7a52/4fe8c/node-project-structure.jpg)

**Update 04/21/2019: [Implementation example repository](https://github.com/santiq/bulletproof-nodejs)**

Express.js is great frameworks for making a node.js REST APIs however it doesn’t give you any clue on how to organizing your node.js project.

While it may sound silly, this is a real problem.

The correct organization of your node.js project structure will avoid duplication of code, will improve stability, and potentially, will help you scale your services if is done correctly.

This post is extense research, from my years of experience dealing with a poor structured node.js project, bad patterns, and countless hours of refactoring code and moving things around.

If you need help to align your node.js project architecture, just drop me a letter at sam@softwareontheroad.com

*   [The folder structure 🏢](#folder)
*   [3 Layer architecture 🥪](#architecture)
*   [Service Layer 💼](#service)
*   [Pub/Sub Layer ️️️️🎙️️](#pubsub)
*   [Dependency Injection 💉](#di)
*   [Unit Testing 🕵🏻](#test)
*   [Cron Jobs and recurring task ⚡](#cron)
*   [Configurations and secrets 🤫](#configs)
*   [Loaders 🏗️](#loaders)
*   [Example repository](https://github.com/santiq/bulletproof-nodejs)

Here is the node.js project structure that I’m talking about.

I use this in every node.js REST API service that I build, let’s see in details what every component do.

    src
    │   app.js          # App entry point
    └───api             # Express route controllers for all the endpoints of the app
    └───config          # Environment variables and configuration related stuff
    └───jobs            # Jobs definitions for agenda.js
    └───loaders         # Split the startup process into modules
    └───models          # Database models
    └───services        # All the business logic is here
    └───subscribers     # Event handlers for async task
    └───types           # Type declaration files (d.ts) for Typescript

It is more than just a way of ordering javascript files…

The idea is to use the **principle of separation of concerns** to move the business logic away from the node.js API Routes.

 [![3 layer pattern](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/122dab3154cb7e417bbb210bbce7ca01/4a896/server_layers.jpg "3 layer pattern")](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/122dab3154cb7e417bbb210bbce7ca01/8299d/server_layers.jpg) 

Because someday, you will want to use your business logic on a CLI tool, or not going far, in a recurring task.

And make an API call from the node.js server to itself it’s not a good idea…

 [![3 layer pattern for node.js REST API](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/1a21f74cfc4c965f00324afd39642b9f/4a896/server_layers_2.jpg "3 layer pattern for node.js REST API")](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/static/1a21f74cfc4c965f00324afd39642b9f/8299d/server_layers_2.jpg) 

☠️ Don’t put your business logic inside the controllers!! ☠️
------------------------------------------------------------

You may be tempted to just use the express.js controllers to store the business logic of your application, but this quickly becomes spaghetti code, as soon as you need to write unit tests, you will end up dealing with complex mocks for _req_ or _res_ express.js objects.

It’s complicated to distingue when a response should be sent, and when to continue processing in ‘background’, let’s say after the response is sent to the client.

Here is an example of what not to do.

    route.post('/', async (req, res, next) => {
    
      
      const userDTO = req.body;
      const isUserValid = validators.user(userDTO)
      if(!isUserValid) {
        return res.status(400).end();
      }
    
      
      const userRecord = await UserModel.create(userDTO);
      delete userRecord.password;
      delete userRecord.salt;
      const companyRecord = await CompanyModel.create(userRecord);
      const companyDashboard = await CompanyDashboard.create(userRecord, companyRecord);
    
      ...whatever...
    
    
      
      
      res.json({ user: userRecord, company: companyRecord });
    
      
      const salaryRecord = await SalaryModel.create(userRecord, companyRecord);
      eventTracker.track('user_signup',userRecord,companyRecord,salaryRecord);
      intercom.createUser(userRecord);
      gaAnalytics.event('user_signup',userRecord);
      await EmailService.startSignupSequence(userRecord)
    });

This layer is where your business logic should live.

It’s just a collection of classes with clear purposes, following the **SOLID** principles applied to node.js.

_In this layer there should not exists any form of ‘SQL query’, use the data access layer for that._

*   Move your code away from the express.js router
*   Don’t pass the req or res object to the service layer
*   Don’t return anything related to the HTTP transport layer like a status code or headers from the service layer.

**Example**

    route.post('/', 
      validators.userSignup, 
      async (req, res, next) => {
        
        const userDTO = req.body;
    
        
        
        const { user, company } = await UserService.Signup(userDTO);
    
        
        return res.json({ user, company });
      });

Here is how your service will be working behind the scenes.

    import UserModel from '../models/user';
    import CompanyModel from '../models/company';
    
    export default class UserService() {
    
      async Signup(user) {
        const userRecord = await UserModel.create(user);
        const companyRecord = await CompanyModel.create(userRecord); 
        const salaryRecord = await SalaryModel.create(userRecord, companyRecord); 
        
        ...whatever
        
        await EmailService.startSignupSequence(userRecord)
    
        ...do more stuff
    
        return { user: userRecord, company: companyRecord };
      }
    }

[Visit the example repository](https://github.com/santiq/bulletproof-nodejs)

### 🖐️ Need a hand with your node.js application?

Messy code, scalability problems, security issues, feature planning, and architectural advice is just a couple of things that I can help you with.

The pub/sub pattern goes beyond the classic 3 layer architecture proposed here but it’s extremely useful.

The simple node.js API endpoint that creates a user right now, may want to call third-party services, maybe to an analytics service, or maybe start an email sequence.

Sooner than later, that simple “create” operation will be doing several things, and you will end up with 1000 lines of code, all in a single function.

That violates the principle of single responsibility.

So, it’s better to separate responsibilities from the start, so your code remains maintainable.

    import UserModel from '../models/user';
    import CompanyModel from '../models/company';
    import SalaryModel from '../models/salary';
    
    export default class UserService() {
    
      async Signup(user) {
        const userRecord = await UserModel.create(user);
        const companyRecord = await CompanyModel.create(user);
        const salaryRecord = await SalaryModel.create(user, salary);
    
        eventTracker.track(
          'user_signup',
          userRecord,
          companyRecord,
          salaryRecord
        );
    
        intercom.createUser(
          userRecord
        );
    
        gaAnalytics.event(
          'user_signup',
          userRecord
        );
        
        await EmailService.startSignupSequence(userRecord)
    
        ...more stuff
    
        return { user: userRecord, company: companyRecord };
      }
    
    }

**An imperative call to a dependent service is not the best way of doing it.**

A better approach is by emitting an event i.e. ‘a user signed up with this email’.

And you are done, now it’s the responsibility of the listeners to do their job.

    import UserModel from '../models/user';
    import CompanyModel from '../models/company';
    import SalaryModel from '../models/salary';
    
    export default class UserService() {
    
      async Signup(user) {
        const userRecord = await this.userModel.create(user);
        const companyRecord = await this.companyModel.create(user);
        this.eventEmitter.emit('user_signup', { user: userRecord, company: companyRecord })
        return userRecord
      }
    
    }

Now you can split the event handlers/listeners into multiple files.

    eventEmitter.on('user_signup', ({ user, company }) => {
    
      eventTracker.track(
        'user_signup',
        user,
        company,
      );
    
      intercom.createUser(
        user
      );
    
      gaAnalytics.event(
        'user_signup',
        user
      );
    })

    eventEmitter.on('user_signup', async ({ user, company }) => {
      const salaryRecord = await SalaryModel.create(user, company);
    })

    eventEmitter.on('user_signup', async ({ user, company }) => {
      await EmailService.startSignupSequence(user)
    })

You can wrap the await statements into a try-catch block or [you can just let it fail and handle the ‘unhandledPromise’ _process.on(‘unhandledRejection’,cb)_](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/nodejs-crash-exception-handler)

D.I. or inversion of control (IoC) is a common pattern that will help the organization of your code, by ‘injecting’ or passing through the constructor the _dependencies_ of your class or function.

By doing this way you will gain the flexibility to inject a _‘compatible dependency’_ when, for example, you write the unit tests for the service, or when the service is used in another context.

_Code with no D.I_

    import UserModel from '../models/user';
    import CompanyModel from '../models/company';
    import SalaryModel from '../models/salary';  
    class UserService {
      constructor(){}
      Sigup(){
        
        ...
      }
    }

_Code with manual dependency injection_

    export default class UserService {
      constructor(userModel, companyModel, salaryModel){
        this.userModel = userModel;
        this.companyModel = companyModel;
        this.salaryModel = salaryModel;
      }
      getMyUser(userId){
        
        const user = this.userModel.findById(userId);
        return user;
      }
    }

Now you can inject custom dependencies.

    import UserService from '../services/user';
    import UserModel from '../models/user';
    import CompanyModel from '../models/company';
    const salaryModelMock = {
      calculateNetSalary(){
        return 42;
      }
    }
    const userServiceInstance = new UserService(userModel, companyModel, salaryModelMock);
    const user = await userServiceInstance.getMyUser('12346');

The amount of dependencies a service can have is infinite, and refactor every instantiation of it when you add a new one is a boring and error-prone task.

That’s why dependency injection frameworks were created.

The idea is you declare your dependencies in the class, and when you need an instance of that class, you just call the ‘Service Locator’.

Let’s see an example using [typedi](https://www.npmjs.com/package/typedi) an npm library that brings D.I to node.js

[You can read more on how to use typedi in the official documentation](https://www.github.com/typestack/typedi)

_WARNING typescript example_

    import { Service } from 'typedi';
    @Service()
    export default class UserService {
      constructor(
        private userModel,
        private companyModel, 
        private salaryModel
      ){}
    
      getMyUser(userId){
        const user = this.userModel.findById(userId);
        return user;
      }
    }

_services/user.ts_

Now _typedi_ will take care of resolving any dependency the UserService require.

    import { Container } from 'typedi';
    import UserService from '../services/user';
    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.getMyUser('12346');

__Abusing service locator calls is an anti-pattern__

Using Dependency Injection with Express.js in Node.js
-----------------------------------------------------

Using D.I. in express.js is the final piece of the puzzle for this node.js project architecture.

**Routing layer**

    route.post('/', 
      async (req, res, next) => {
        const userDTO = req.body;
    
        const userServiceInstance = Container.get(UserService) 
    
        const { user, company } = userServiceInstance.Signup(userDTO);
    
        return res.json({ user, company });
      });

Awesome, project is looking great ! It’s so organized that makes me want to be coding something right now.

[Visit the example repository](https://github.com/santiq/bulletproof-nodejs)

### 👉 GET MORE ADVANCED node.js DEVELOPMENT ARTICLES

Join the other 2,000+ savvy node.js developers who get article updates.

By using dependency injection and these organization patterns, unit testing becomes really simple.

You don’t have to mock req/res objects or require(…) calls.

**Example: Unit test for signup user method**

_tests/unit/services/user.js_

    import UserService from '../../../src/services/user';
    
    describe('User service unit tests', () => {
      describe('Signup', () => {
        test('Should create user record and emit user_signup event', async () => {
          const eventEmitterService = {
            emit: jest.fn(),
          };
    
          const userModel = {
            create: (user) => {
              return {
                ...user,
                _id: 'mock-user-id'
              }
            },
          };
    
          const companyModel = {
            create: (user) => {
              return {
                owner: user._id,
                companyTaxId: '12345',
              }
            },
          };
    
          const userInput= {
            fullname: 'User Unit Test',
            email: 'test@example.com',
          };
    
          const userService = new UserService(userModel, companyModel, eventEmitterService);
          const userRecord = await userService.SignUp(teamId.toHexString(), userInput);
    
          expect(userRecord).toBeDefined();
          expect(userRecord._id).toBeDefined();
          expect(eventEmitterService.emit).toBeCalled();
        });
      })
    })

So, now that the business logic encapsulated into the service layer, it’s easier to use it from a Cron job.

You should never rely on node.js `setTimeout` or another primitive way of delay the execution of code, but on a framework that persist your jobs, and the execution of them, in a database.

This way you will have control over the failed jobs, and feedback of those who succeed. I already wrote on good practice for this so, [check my guide on using agenda.js the best task manager for node.js](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/nodejs-scalability-issues).

Following the battle-tested concepts of [Twelve-Factor App](https://12factor.net/) for node.js the best approach to store API Keys and database string connections, it’s by using **dotenv**.

Put a `.env` file, that must never be committed _(but it has to exist with default values in your repository)_ then, the npm package `dotenv` loads the .env file and insert the vars into the `process.env` object of node.js.

That could be enough but, I like to add an extra step. Have a `config/index.ts` file where the `dotenv` npm package loads the .env file and then I use an object to store the variables, so we have a structure and code autocompletion.

_config/index.js_

    const dotenv = require('dotenv');
    
    dotenv.config();
    
    export default {
      port: process.env.PORT,
      databaseURL: process.env.DATABASE_URI,
      paypal: {
        publicKey: process.env.PAYPAL_PUBLIC_KEY,
        secretKey: process.env.PAYPAL_SECRET_KEY,
      },
      paypal: {
        publicKey: process.env.PAYPAL_PUBLIC_KEY,
        secretKey: process.env.PAYPAL_SECRET_KEY,
      },
      mailchimp: {
        apiKey: process.env.MAILCHIMP_API_KEY,
        sender: process.env.MAILCHIMP_SENDER,
      }
    }

This way you avoid flooding your code with `process.env.MY_RANDOM_VAR` instructions, and by having the autocompletion you don’t have to know how to name the env var.

[Visit the example repository](https://github.com/santiq/bulletproof-nodejs)

I took this pattern from [W3Tech microframework](https://www.npmjs.com/package/microframework-w3tec) but without depending upon their package.

The idea is that you split the startup process of your node.js service into testable modules.

Let’s see a classic express.js app initialization

    const mongoose = require('mongoose');
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const cors = require('cors');
    const errorhandler = require('errorhandler');
    const app = express();
    
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.use(cors());
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json(setupForStripeWebhooks));
    app.use(require('method-override')());
    app.use(express.static(__dirname + '/public'));
    app.use(session({ secret: process.env.SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    
    require('./config/passport');
    require('./models/user');
    require('./models/company');
    app.use(require('./routes'));
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.json({'errors': {
        message: err.message,
        error: {}
      }});
    });
    
    
    ... more stuff 
    
    ... maybe start up Redis
    
    ... maybe add more middlewares
    
    async function startServer() {    
      app.listen(process.env.PORT, err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Your server is ready !`);
      });
    }
    
    
    startServer();

As you see, this part of your application can be a real mess.

Here is an effective way to deal with it.

    const loaders = require('./loaders');
    const express = require('express');
    
    async function startServer() {
    
      const app = express();
    
      await loaders.init({ expressApp: app });
    
      app.listen(process.env.PORT, err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Your server is ready !`);
      });
    }
    
    startServer();

Now the loaders are just tiny files with a concise purpose

_loaders/index.js_

    import expressLoader from './express';
    import mongooseLoader from './mongoose';
    
    export default async ({ expressApp }) => {
      const mongoConnection = await mongooseLoader();
      console.log('MongoDB Initialized');
      await expressLoader({ app: expressApp });
      console.log('Express Initialized');
    
      
    
      
      
    }

The express loader

_loaders/express.js_

    import * as express from 'express';
    import * as bodyParser from 'body-parser';
    import * as cors from 'cors';
    
    export default async ({ app }: { app: express.Application }) => {
    
      app.get('/status', (req, res) => { res.status(200).end(); });
      app.head('/status', (req, res) => { res.status(200).end(); });
      app.enable('trust proxy');
    
      app.use(cors());
      app.use(require('morgan')('dev'));
      app.use(bodyParser.urlencoded({ extended: false }));
    
      
    
      
      return app;
    })

The mongo loader

_loaders/mongoose.js_

    import * as mongoose from 'mongoose'
    export default async (): Promise<any> => {
      const connection = await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
      return connection.connection.db;
    }

We deep dive into a production tested node.js project structure, here are some summarized tips:

*   Use a 3 layer architecture.
*   Don’t put your business logic into the express.js controllers.
*   Use PubSub pattern and emit events for background tasks.
*   Have dependency injection for your peace of mind.
*   Never leak your passwords, secrets and API keys, use a configuration manager.
*   Split your node.js server configurations into small modules that can be loaded independently.

### [See the example repository here](https://github.com/santiq/bulletproof-nodejs)

### Get The Latest Articles In Your Inbox.

Join the other 2000+ savvy node.js developers who get article updates.

You will receive only high-quality articles about Node.js, Cloud Computing and Javascript front-end frameworks.

Unsubscribe anytime.


[Source](https://softwareontheroad.com/ideal-nodejs-project-structure/)