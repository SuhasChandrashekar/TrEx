'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for entity object.
 */
let UserSchema = new Schema({
    /**
     * Title of the todo.
     */
    userName: {
        type: String
    },
    userPassword: {
        type: String
    },
    userFirstname: {
        type: String
    },
    userLastname: {
        type: String
    },
    userDOB: {
        type: String
    },
    userPhoneNumber: {
        type: Number
    },
    userAddress: {
        type: String
    },
    userCity: {
        type: String
    },
    userState: {
        type: String
    },
    userCards :[
        {cardNo: String,
          cardtype:String,
         nameonCard:String,
         expMonth: String,
         expYear:String,
         cvv:String
        }
    ],userToken:{
        type: String
    }
}, {
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('users', UserSchema);
