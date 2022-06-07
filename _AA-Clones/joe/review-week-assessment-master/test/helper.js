var mongoose = require('mongoose')
var Promise = require('bluebird')
  // async = require('async'),

/**
 * Clear database
 *
 */

exports.dates = {
  addDay: function(n) {
    var d = new Date()
    d.setDate(d.getDate() + n)
    return d
  },
  tomorrow: function() {
    return this.addDay(1)
  },
  yesterday: function() {
    return this.addDay(-1)
  }
}

exports.clear = {
  task: function() {
    return mongoose.model('Task').remove().exec()
  }
}

exports.clearDb = function(done) {
  return Promise.props(exports.clear)
};
