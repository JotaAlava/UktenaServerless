/**
 * Created by jalava on 3/27/2017.
 */
var vogels = require('vogels-promisified'),
    config = require('../config');
vogels.AWS.config.update({region: config.region});

var modelName = 'Tomato',
    tableName = 'Tomatoes',

    Joi = require('joi'),
    Tomato = vogels.define(modelName, {
        hashKey: 'author',
        rangeKey: 'createdAt',
        // add the timestamp attributes (updatedAt, createdAt)
        timestamps: true,

        schema: {
            id: vogels.types.uuid(),
            author: Joi.string(),
            description: Joi.string()
        },

        tableName: tableName
    });

module.exports = Tomato;

// TESTING BELOW

// vogels.createTables(function(err) {
//     if (err) {
//         console.log('Error creating tables: ', err);
//     } else {
//         console.log('Tables has been created');
//
//     }
// });

// var sut = require('./tomato');
// var date = new Date();
// date.setDate(date.getDate() - 9);
//
// sut.query('google-oauth2|107593470509194206658')
//     .where('createdAt').gt(date.toISOString())
//     .descending()
//     .exec(function(err, resp){
//         console.log(err);
//         console.log(res);
//     });