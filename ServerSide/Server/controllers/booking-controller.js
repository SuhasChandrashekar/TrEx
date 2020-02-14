/**
 * Controller for booking endpoints.
 */

'use strict';
//import booking service.
const bookingService = require('../services/booking-service');
/**
 * Returns a list of booking in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (bookings) => {
        response.status(200);
        response.json(bookings);
    };
    bookingService.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new booking with the request JSON and
 * returns booking JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    console.log(request.body);
    const val={ entityName:request.body.entityName,entityType: request.body.entityType, firstName :request.body.firstName , userName: request.body.username , lastName:request.body.lastName,userPhoneNumber:request.body.userPhoneNumber,userAddress: request.body.userAddress, ticketsBooked: request.body.ticketsBooked, totalBookingPrice: request.body.totalBookingPrice , bookingId: request.body.bookingId ,cardName:request.body.cardName, cardNo: request.body.cardName};
    const newBooking = Object.assign({},val);
    const resolve = (booking) => {
        response.status(200);
        response.json(booking);
    };
    bookingService.save(newBooking)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a booking object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.get = function (request, response) {
    const resolve = (booking) => {
        response.status(200);
        response.json(booking);
    };
    bookingService.get(request.params.bookingId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a booking object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const booking = Object.assign({}, request.body);
    const resolve = (booking) => {
        response.status(200);
        response.json({
            message: 'booking Successfully updated' + booking
        });
    };
    booking._id = request.params.bookingId;
    bookingService.update(booking)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a booking object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (booking) => {
        response.status(200);
        response.json({
            message: 'Booking Successfully deleted'
        });
    };
    bookingService.delete(request.params.bookingId)
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