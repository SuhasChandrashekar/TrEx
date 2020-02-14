/**
 * Service for connect operations.
 */

'use strict';
const mongoose = require('mongoose'),
    CONNECT= mongoose.model('connects');

/**
 * Returns an array of connect object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function (params) {
    const promise = CONNECT.find(params).exec();
    return promise;
};

/**
 * Saves and returns the new connect object.
 *
 * @param {Object} connect {connect object}
 */
exports.save = function (connect) {
    const newconnect = new CONNECT({name:connect.name, message: connect.message,username: connect.username,city: connect.city, date: connect.date});
     
    const promise = newconnect.save();
    return promise;
};

/**
 * Returns the connect object matching the id.
 *
 * @param {string} connectId {Id of the connect object}
 */
exports.get = function (connectId) {
    const promise = CONNECT.findById(connectId).exec();
    return promise
};

/**
 * Updates and returns the connect object.
 *
 * @param {Object} connect {connect object}
 */
exports.update = function (connect) {
    connect.modified_date = new Date();
    const promise = CONNECT.findOneAndUpdate({_id: connect._id}, connect,{new: true}).exec();
    return promise;
};

/**
 * Deletes the  object matching the id.
 *
 * @param {string} connectId {Id of the connect object}
 */ 
exports.delete = function (connectId) {
    const promise = CONNECT.remove({_id: connectId});
    return promise;
};