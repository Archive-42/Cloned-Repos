'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate'); 

var schema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String
    },

    admin:{type:Boolean},

    reviewHistory: {type: mongoose.Schema.Types.ObjectId, ref: 'ReviewHistory'},

    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'},

    orders: [{type: mongoose.Schema.Types.ObjectId, ref:'Order'}],
    
    photoUrl:{type: String},

    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },

    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

// schema.plugin(findOrCreate);

mongoose.model('User', schema);