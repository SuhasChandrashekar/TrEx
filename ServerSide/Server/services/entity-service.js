/**
 * Service for entity operations.
 */

'use strict';
const mongoose = require('mongoose'),
    ENTITY = mongoose.model('entities');

/**
 * Returns an array of entity object matching the search parameters.
 *
 * @param {Object} params {Search parameters}
 */

exports.search = function (params) {
    const promise = ENTITY.find({}).exec();
    return promise;
};

/**
 * Saves and returns the new entity object.
 *
 * @param {Object} entity {entity object}
 */
exports.save = function (entity) {
    const newentity = new ENTITY({entityType:entity.entityType,imageUrl:entity.imageUrl,likes:entity.likes, entityAddress: entity.entityAddress,entityCity: entity.entityCity,entityState: entity.entityState,entityCountry: entity.entityCountry, entityAddress: entity.entityAddress, rating : entity.rating, entityName: entity.entityName ,price: entity.price, entityAddress: entity.entityAddress, coordX : entity.coordX,coordY:entity.coordY,imageUrl:entity.imageUrl,entityDescription: entity.entityDescription});
    console.log(entity.entityName +" "+entity.imageUrl);
      
    const promise = newentity.save();
    return promise;
};

/**
 * Returns the entity object matching the id.
 *
 * @param {string} entityId {Id of the entity object}
 */
exports.get = function (entityId) {
    const promise = ENTITY.findById(entityId).exec();
    return promise
   
};

/**
 * Updates and returns the entity object.
 *
 * @param {Object} entity {entity object}
 */
exports.update = function (entity) {
    entity.modified_date = new Date();
    const promise = ENTITY.findOneAndUpdate({_id: entity._id}, entity,{new: true}).exec();
    return promise;
};

/**
 * Deletes the  object matching the id.
 *
 * @param {string} entityId {Id of the entity object}
 */
exports.delete = function (entityId) {
    const promise = ENTITY.remove({_id: entityId});
    return promise;
};

exports.searchEntity = function (params) {
    const promise = ENTITY.find(params).exec();
    return promise;
};