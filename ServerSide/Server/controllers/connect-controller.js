/**
 * Controller for connect endpoints.
 */

'use strict';
//import connect service.
const connectService = require('../services/connect-services');
/**
 * Returns a list of connect in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (connect) => {
        response.status(200);
        response.json(connect);
    };
    connectService.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new connect with the request JSON and
 * returns connect JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    console.log(request.body);
    const val={ name:request.body.name,username: request.body.username, city :request.body.city, message :request.body.message , date: request.body.date};
    console.log(val);
    const newConnect = Object.assign({},val);
    const resolve = (connect) => {
        response.status(200);
        response.json(connect);
    };
    connectService.save(newConnect)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a connect object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    const resolve = (connect) => {
        response.status(200);
        response.json(connect);
    };
    connectService.get(request.params.connectId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a connect object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const connect = Object.assign({}, request.body);
    const resolve = (connect) => {
        response.status(200);
        response.json({
            message: 'connect Successfully updated' + connect
        });
    };
    connect._id = request.params.connectId;
    connectService.update(connect)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a connect object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (connect) => {
        response.status(200);
        response.json({
            message: 'connect Successfully deleted'
        });
    };
    connectService.delete(request.params.connectId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};