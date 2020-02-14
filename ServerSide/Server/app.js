'use strict';


module.exports = function (app) {
    //Initialize models
    let entityModel = require('./models/entity');
    let userModel = require('./models/user');
    let bookingModel = require('./models/booking');
    let connectModel = require('./models/connect');

    //Initialize routes for app.js
    let mainroute = require('./routes/route');
    mainroute(app);
};