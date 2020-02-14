'use strict';
module.exports = function (app) {
    const entityController = require('../controllers/entity-controller');
    // entity Routes for search and create.
    app.route('/entities')
        .get(entityController.list)
        .post(entityController.post);

        app.route('/entities/searchEntities')
        .get(entityController.searchList)
    // entity Routes for get, update and delete.
    app.route('/entities/:entityId')
        .get(entityController.get)
        .put(entityController.put)
        .delete(entityController.delete);
    
    const userController = require('../controllers/user-controller');
    // user Routes for search and create.
    app.route('/users')
        .get(userController.list)
       // .post(userController.post);

    // user Routes for get, update and delete.
    app.route('/users/:userId')
        .get(userController.get)
        .put(userController.put)
        .delete(userController.delete);

        const connectController = require('../controllers/connect-controller');
        // user Routes for search and create.
        app.route('/connects')
            .get(connectController.list)
            .post(connectController.post);
    
        // user Routes for get, update and delete.
        app.route('/connects/:connectId')
            .get(connectController.get)
            .put(connectController.put)
            .delete(connectController.delete);

            const bookingController = require('../controllers/booking-controller');

    app.route('/bookings')
        .get(bookingController.list)
        .post(bookingController.post);
    app.route('/bookings/:bookingId')
        .get(bookingController.get)
        .put(bookingController.put)
        .delete(bookingController.delete);
        
        app.route('/users/register')
        .post(userController.register);

    app.route('/users/authenticate')
        .post(userController.authenticate);

    app.route('/users/current')
        .get(userController.getCurrent);

};