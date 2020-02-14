'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for entity object.
 */
let BookingSchema = new Schema({
    /**
     * Title of the todo.
     */
    entityName: {
        type: String
    },
    // disp
    entityType: {
        type: String
    },
    userName: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userPhoneNumber: {
        type: Number
    },
    userAddress: {
        type: String
    },
    ticketsBooked:{
        type: Number
    },
    totalBookingPrice:{
        type: Number
    },
    bookingId:{
        type: String
    },
    cardName:{
        type: String
    },
    cardNo:{
        type: String
    },
}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
BookingSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
BookingSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('bookings', BookingSchema);
