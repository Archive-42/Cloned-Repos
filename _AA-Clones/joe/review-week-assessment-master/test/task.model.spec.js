var mongoose = require('mongoose')
  , helper = require('./helper')
  , should = require('should')
  , models = require('../models')
  , Task = models('Task')
/**
 * Start here
 *
 * These tests describe the model that you'll be setting up in models/task.model.js
 *
 */

describe('Task', function () {
  //clear the database before the tests
  before(function(done) {
    helper.clearDb().then(function() {
      done()
    }, done)
  })

  describe('Virtuals', function() {
    describe('timeRemaining', function() {

      it('returns the Infinity value if task has no due date', function() {
        var task = new Task()
        task.timeRemaining.should.equal(Infinity)
      })

      it('returns the difference between due date and now', function() {
        //oneDay is a day expressed in milliseconds
        var oneDay = 1000 /*ms*/ * 60 /*s*/ * 60 /*m*/ * 24 /*h*/

        //create a task due tomorrow
        var task = new Task({
          //this function returns a date one day in the future
          due: helper.dates.tomorrow()
        })

        task.timeRemaining.should.be.approximately(oneDay, 10) //should be within 10 ms
      })
    })

    describe('overdue', function() {
      it('is true if the due date is in the past', function() {
        var task = new Task({
          due: helper.dates.yesterday()
        })
        task.overdue.should.be.exactly(true);
      })

      it('is should be false if the due date is in the past but complete is true', function() {
        var task = new Task({
          due: helper.dates.yesterday(),
          complete: true
        })
        task.overdue.should.be.exactly(false);
      })

      it('is not overdue if the due date is in the future', function() {
        var task = new Task({
          due: helper.dates.tomorrow()
        })
        task.overdue.should.be.exactly(false);
      })
    })
  })


  describe('methods', function() {
    var task

    beforeEach(function(done) {
      task = new Task({
        name: 'task'
      })
      task.save(done)
    })

    describe('addChild', function() {
      it('should return a promise for a new task with the parent\'s id', function(done) {
        task
          .addChild({ name: 'task2' })
          .then(function(child) {
            child.parent.should.equal(task._id)
            child.name.should.equal('task2')
            done()
          })
          .then(null, done) //catch test errors
      })
    })

    describe('getChildren', function() {

      beforeEach(function(done) {
        task.addChild({ name: 'foo' }).then(function() {
          done()
        }, done)
      })

      it('should a promise for an array of the tasks children', function(done) {
        task
          .getChildren()
          .then(function(children) {
            children.should.have.lengthOf(1)
            children[0].name.should.equal('foo')
            done()
          })
          .then(null, done) //catch test errors
      })
    })

    describe('getSiblings', function() {

      var childrenReferences = []

      var childBuilder = function(done) {
        task.addChild({ name: 'foo' }).then(function(child) {
          childrenReferences.push(child)
          done()
        }, done)
      }

      //build two children
      beforeEach(childBuilder)
      beforeEach(childBuilder)

      it('returns a promise for an array of siblings', function(done) {
        childrenReferences[0]
          .getSiblings()
          .then(function(siblings) {
            siblings.should.have.lengthOf(1)
            siblings[0].id.should.equal(childrenReferences[1].id)
            done()
          })
          .then(null, done)
      })

    })

  })

});
