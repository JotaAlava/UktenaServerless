/**
 * Created by jalava on 3/27/2017.
 */
var vogels = require('vogels-promisified'),
    config = require('../config');
vogels.AWS.config.update({region: config.region});

var modelName = 'Tomato',
    tableName = 'Tomatoes',

    Joi = require('joi'),
    Booking = vogels.define(modelName, {
        hashKey: 'id',

        // add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        schema: {
            id: vogels.types.uuid(),
            author: Joi.string(),
            description: Joi.string()
        },

        tableName: tableName
    });

module.exports = Booking;