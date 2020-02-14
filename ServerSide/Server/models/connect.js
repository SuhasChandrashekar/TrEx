'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for connect object.
 */
let ConnectSchema = new Schema({
    /**
     * Title of the Connect.
     */

    // disp
    name: {
        type: String
    },
    // disp
    username: {
        type: String
    },
    // disp
    message: {
        type: String
    },
    //disp
    date: {
        type: String
    },
    city: {
        type: String
    }

}, {
    versionKey: false
});

// Duplicate the id field as mongoose returns _id field instead of id.
ConnectSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ConnectSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('connects', ConnectSchema);