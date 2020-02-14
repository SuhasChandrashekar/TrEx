/**
 * Service for user operations.
 */

'use strict';
const mongoose = require('mongoose'),
    USER = mongoose.model('users');

var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/entityDB', { native_parser: true });
db.bind('users');

/**
 * Returns an array of user object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (params) {
    const promise = USER.find(params).exec();
    return promise;
};

/**
 * Saves and returns the new user object.
 *
 * @param {Object} user {user object}
 */
exports.save = function (user) {
    const newuser = new USER({ userName: user.userName , userEmailId: user.userEmailId, userPassword : user.userPassword,userFirstname: user.userFirstname,userLastname: user.userLastname,userDOB:user.userDOB,userPhoneNumber:user.userPhoneNumber,userAddress: user.userAddress,userCity: user.userCity,userState: user.userState,userCountry: user.userCountry});
    console.log(user.userName +" "+user.userEmailId);
    //newuser      
    const promise = newuser.save();
    return promise;
};

/**
 * Returns the user object matching the id.
 *
 * @param {string} userId {Id of the user object}
 */
exports.get = function (userId) {
    const promise = USER.findById(userId).exec();
    return promise
};

/**
 * Updates and returns the user object.
 *
 * @param {Object} user {user object}
 */
exports.update = function (user) {
    user.modified_date = new Date();
    const promise = USER.findOneAndUpdate({_id: user._id}, user,{new: true}).exec();
    return promise;
};

/**
 * Deletes the  object matching the id.
 *
 * @param {string} userId {Id of the entity object}
 */
exports.delete = function (userId) {
    const promise = USER.remove({_id: userId});
    return promise;
};

exports.create = function (userParam) {
    //var deferred = Q.defer();
    console.log(userParam.username);
    // validation
    return new Promise((res, rej) => {
        db.users.findOne(
            { username: userParam.username },
            function (err, user) {
                if (err) rej(err.name + ': ' + err.message);
    
                if (user) {
                    // username already exists
                    rej('Username "' + userParam.username + '" is already taken');
                } else {
                    createUser(userParam).then(() => res());
                }
            });
    })
}

function createUser(userParam) {
    // set user object to userParam without the cleartext password
    console.log("Create User")
    return new Promise((res, rej) => {
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

    db.users.insert(
        user,
        function (err, doc) {
            if (err) rej(err.name + ': ' + err.message);
            res();
        });
    });
}

exports.authenticate = function (username, password) {
    var deferred = Q.defer();
    console.log("reached services auth func");
    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            console.log("auth sucess");
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id },'secret')
            });
        } else {
            // authentication failed
            console.log("auth fail");
            deferred.resolve();
        }
    });
   // console.log(promise);
    return deferred.promise;
}

exports.getAll = function () {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

exports.getById = function (_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}