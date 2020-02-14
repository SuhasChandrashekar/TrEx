'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for entity object.
 */
let EntitySchema = new Schema({
    /**
     * Title of the entity.
     */

    // disp
    entityName: {
        type: String
    },
    // disp
    entityType: {
        type: String
    },
    // disp
    entityAddress: {
        type: String
    },
    //disp
    entityCity: {
        type: String
    },
    entityState: {
        type: String
    },
    entityCountry: {
        type: String
    },
    coordX: {
        type: Number
    },
    coordY: {
        type: Number
    },
    sharableLink: {
        type: String
    },
    rating: {
        type: Number
    },
    likes: {
        type: Number
    },
    imageUrl: {
        type: String
    },
    entityDescription: {
        type: String
    },
    price: {
        type: String
    },
    count: {
        type: Number
    },
    videoURL: {
        type: String
    },
    imageArray:[{
        type:String
    }]

}, {
    versionKey: false
});
////////////////////////////////////////////////
let UserSchema = new Schema({
    /**
     * Title of the todo.
     */
    userName: {
        type: String
    },
    userEmailId: {
        type: String
    },
    userPassword: {
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
    userCountry: {
        type: String
    }
}, {
    versionKey: false
});
/////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////
// Duplicate the id field as mongoose returns _id field instead of id.
EntitySchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
EntitySchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('entities', EntitySchema);
