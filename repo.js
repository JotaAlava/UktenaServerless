/**
 * Created by Jose on 3/18/2017.
 */
'use strict';
var Promise = require('bluebird');
var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
var db = new aws.DynamoDB.DocumentClient();
Promise.promisifyAll(Object.getPrototypeOf(db));

// This repo is the only place we need to change
// to change between MongoDb or DynamoDb (raw or vogels)
module.exports = function (Model, customOps) {
  var get = (options)=> {
    let result;
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp(options);
    }

    if (preOpResult) {
      if (customOps.get) {
        result = customOps.get(Model, options).execAsync();
      }
      else if (options.hasOwnProperty('query') && options.query.hasOwnProperty('id')) {
        result = Model
          .query(options.query.id.toString())
          .execAsync();

      } else {
        result = Model.scan()
          .loadAll()
          .execAsync()
      }
    } else {
      result = Promise.reject(new Error('Pre op failed.'));
    }

    return result;
  };

  var add = (options)=> {
    let result;
    let preOpResult = true;
    if (options.hasOwnProperty('preOps') && options.preOps !== undefined && options.preOps !== null) {
      preOpResult = options.preOps.post(options);
    }

    if (preOpResult) {
      if (options.hasOwnProperty('body')) {
        result = Model.createAsync(options.body);
      }
    } else {
      result = Promise.reject(new Error('Pre op failed.'))
    }

    return result;
  };

  var set = (options)=> {
    let result;
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp(options);
    }

    if (preOpResult) {
      if (options.hasOwnProperty('body')) {
        result = Model.updateAsync(options.body);
      }
    } else {
      result = Promise.reject(new Error('Pre op failed.'))
    }


    return result;
  };

  var del = (options)=> {
    let result;
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp();
    }

    if (preOpResult) {
      if (options && options.hasOwnProperty('query') && options.query.hasOwnProperty('id')) {
        result = Model.destroyAsync(options.query.id.toString());
      } else {
        result = Promise.reject(new Error('Pre op failed.'))
      }

    }

    return result;
  };

  return {
    add: add,
    set: set,
    get: get,
    delete: del
  }
};

// TESTING BELOW

// var customOps = {
//   get: function (Model, options) {
    // var date = new Date(),
    //     hasKey = options.query.author.toString(),
    //     rangeKey = 'createdAt';
    //
    // date.setDate(date.getDate() - 8);
    //
    // return Model
    //     .query(hasKey)
    //     .where(rangeKey)
    //     .gt(date.toISOString())
    //     .descending()
  // }
// };

// var db = require('./repo'),
//     Modelo = require('./models/tomato'),
//     options = {query: {author: 'google-oauth2|107593470509194206658'}},
//     sut = new db(Modelo, customOps);
//
// sut.get(options)
//     .then(function(data){
//       console.log(data)
//     });