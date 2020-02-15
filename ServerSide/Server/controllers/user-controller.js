/**
 * Controller for user endpoints.
 */

'use strict';
//import user service.
const userService = require('../services/user-service');
/**
 * Returns a list of entity in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (users) => {
        response.status(200);
        response.json(users);
    };
    userService.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new user with the request JSON and
 * returns user JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    console.log(request.body);
    /////////////need to do
    //const val={ userName: request.body.userName , userEmailId: request.body.userEmailId, userPassword: request.body.userPassword, userDOB : request.body.userDOB,userPhoneNumber: request.body.userPhoneNumber,userAddress: request.body.userAddress,userCity: request.body.userCity,userState: request.body.userState,userCountry: request.body.userCountry};
    const val={ userName: request.body.userName , userPassword: request.body.userPassword, userFirstname: request.body.userFirstname, userLastname: request.body.userLastname};
    /////////////
    const newUser = Object.assign({},val);
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.save(newUser)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a entity object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    const resolve = (user) => {
        response.status(200);
        response.json(user);
    };
    userService.get(request.params.userId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a user object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const user = Object.assign({}, request.body);
    const resolve = (user) => {
        response.status(200);
        response.json({
            message: 'user Successfully updated' + user
        });
    };
    user._id = request.params.userId;
    userService.update(user)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a user object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (user) => {
        response.status(200);
        response.json({
            message: 'user Successfully deleted'
        });
    };
    userService.delete(request.params.userId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// Login
exports.login = function(request, response) {
    response.json(request.user);
}

//Register User
exports.register = function (req, res) {
    userService.create(req.body)
        .then(function () {
            console.log("Here");
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//Authenticate User
exports.authenticate = function (req, res) {
    console.log("reached controller auth func");
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                console.log("success");
                console.log(user);
                res.json(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//Get All Users
exports.getAll = function (req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//get Current User
exports.getCurrent = function (req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
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