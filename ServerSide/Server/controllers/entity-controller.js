/**
 * Controller for entity endpoints.
 */

'use strict';
//import entity service.
const entityService = require('../services/entity-service');
/**
 * Returns a list of entity in JSON based on the
 * search parameters.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list = function (request, response) {
    const resolve = (entities) => {
        response.status(200);
        response.json(entities);
    };
    entityService.search({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Creates a new entity with the request JSON and
 * returns entity JSON object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.post = function (request, response) {
    console.log(request.body);
    const val={ likes:request.body.likes,rating: request.body.rating, entityState: request.body.entityState,imageURL:request.body.imageURL,entityAddress:request.body.entityAddress,entityCity: request.body.entityCity, entityType: request.body.entityType, entityName: request.body.entityName , price: request.body.price,entityCountry:request.body.entityCountry, entityAddress: request.body.entityAddress, coordX: request.body.coordX, coordY : request.body.coordY,imageUrl: request.body.imageUrl,entityDescription: request.body.entityDescription};
    const newEntity = Object.assign({},val);
    const resolve = (entity) => {
        response.status(200);
        response.json(entity);
    };
    entityService.save(newEntity)
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
    const resolve = (entity) => {
        response.status(200);
        response.json(entity);
    };
    entityService.get(request.params.entityId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Updates and returns a entity object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.put = function (request, response) {
    const entity = Object.assign({}, request.body);
    const resolve = (entity) => {
        response.status(200);
        response.json({
            message: 'entity Successfully updated' + entity
        });
    };
    entity._id = request.params.entityId;
    entityService.update(entity)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Deletes a entity object.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.delete = function (request, response) {
    const resolve = (entity) => {
        response.status(200);
        response.json({
            message: 'todo Successfully deleted'
        });
    };
    entityService.delete(request.params.entityId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
//get search List
exports.searchList = function (request, response) {
    console.log("Suhas searchlist");
    const resolve = (entities) => {
        response.status(200);
        response.json(entities);
    };
    entityService.searchEntity({})
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