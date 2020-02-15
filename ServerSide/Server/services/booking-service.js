/**
 * Service for booking operations.
 */

'use strict';
var express = require('express');
var app = express();
//using nodemailer to send email after booking is successful
var nodemailer = require('nodemailer');
//var QRCode = require("qrcode-svg");
const mongoose = require('mongoose'),
    BOOKING = mongoose.model('bookings');

/**
 * Returns an array of booking object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */
exports.search = function(params) {
    const promise = BOOKING.find(params).exec();
    return promise;
};

/**
 * Saves and returns the new booking object.
 *
 * @param {Object} booking {booking object}
 */
exports.save = function(booking) {

    /**  app.get('/', function(req, res) {
         QRCode.toDataURL(booking.bookingId, function(err, url) {
             console.log(url)
             res.render('index', { qr: url });
         });
     });
     */

    // app.post('/send-email', async function(req, res) {

    //     let img = await QRCode.toDataURL('data invoice untuk di kirim melalui email');

    // });


    // var svg = new QRCode(booking.bookingId).svg();

    // create reusable transporter object using the default SMTP transport

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'feedthefarmeraed@gmail.com',
            pass: 'Feedthefarmeraed123!'
        }
    });
    // send mail with defined transport object
    console.log("Email Sent");
    console.log(booking.userName);
    var mailOptions = {
        from: 'feedthefarmeraed@gmail.com', //sender address
        to: booking.userName, //receiever address

        subject: 'TrEx Booking Successful', //subject line
        //encoding html with user and booking information
        //using live qrcode API to generate qrcode for booking ID and attaching it to email
        html: `<h1>Welcome to TrEx ! <br> Your booking was successful !!</h1>` +
            `<p>Name:` + `&nbsp;` + booking.userName + `<br>` + `Phone:` + booking.userPhoneNumber +
            `<br>` + `Booking ID:` + booking.bookingId + `<br>` + `Event Price: ` + booking.totalBookingPrice +
            `<br>` + `<Booking emailID : ` + booking.userName + `</p>` + `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.bookingId}"/>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    const newbooking = new BOOKING({ entityType: booking.entityType, entityName: booking.entityName, userName: booking.userName, firstName: booking.firstName, lastName: booking.lastName, userEmailId: booking.userEmailId, userPhoneNumber: booking.userPhoneNumber, userAddress: booking.userAddress, ticketsBooked: booking.ticketsBooked, totalBookingPrice: booking.totalBookingPrice, bookingId: booking.bookingId, cardName: booking.cardName, cardNo: booking.cardNo });
    console.log(booking.entityName + " " + booking.bookingId + booking.userName);
    const promise = newbooking.save();
    return promise;
};

/**
 * Returns the booking object matching the id.
 *
 * @param {string} bookingId {Id of the booking object}
 */
exports.get = function(bookingId) {
    const promise = BOOKING.findById(bookingId).exec();
    return promise
};

/**
 * Updates and returns the booking object.
 *
 * @param {Object} booking {booking object}
 */
exports.update = function(booking) {
    booking.modified_date = new Date();
    const promise = BOOKING.findOneAndUpdate({ _id: booking._id }, booking, { new: true }).exec();
    return promise;
};

/**
 * Deletes the  object matching the id.
 *
 * @param {string} bookingId {Id of the booking object}
 */
exports.delete = function(bookingId) {
    const promise = BOOKING.remove({ _id: bookingId });
    return promise;
};