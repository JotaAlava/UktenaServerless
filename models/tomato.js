/**
 * Created by jalava on 3/27/2017.
 */
var vogels = require('vogels-promisified'),
    config = require('../config');
vogels.AWS.config.update({region: config.region});

var modelName = 'Property',
    tableName = 'Properties',

    Joi = require('joi'),
    Booking = vogels.define(modelName, {
        hashKey: 'id',

        // add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        schema: {
            id: vogels.types.uuid(),
            altId: Joi.string(),
            bpId: Joi.string(),
            name: Joi.string(),
            lat: Joi.string(),
            long: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            country: Joi.string(),
            destinationId: Joi.string(),
            townId: Joi.string(),
            communityId: Joi.string(),
            photos: [Joi.string(), Joi.string()],
            description: Joi.string(),
            houseInformation: Joi.string(),
            guests: Joi.string(),
            rating: Joi.string(),
            bedrooms: Joi.string(),
            bathrooms: Joi.string(),
            neighborhood: Joi.string(),
            propertyType: Joi.string(),
            amenities: Joi.string()
        },

        tableName: tableName
    });

module.exports = Booking;