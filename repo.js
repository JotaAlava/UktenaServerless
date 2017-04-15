/**
 * Created by Jose on 3/18/2017.
 */
'use strict';
var Promise = require('bluebird');
var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
var db = new aws.DynamoDB.DocumentClient();
Promise.promisifyAll(Object.getPrototypeOf(db));

module.exports = function (Model) {
  var get = (options)=> {
    let result = Promise.reject(new Error('Pre op failed.'));
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp();
    }

    if (preOpResult) {
      if (options.hasOwnProperty('query') && options.query.hasOwnProperty('id')) {
        result = Model
            .query(options.query.id.toString())
            .execAsync();

      } else {
        result = Model.scan()
            .loadAll()
            .execAsync()
      }
    }

    return result;
  };

  var add = (options)=> {
    let result = Promise.reject(new Error('Pre op failed.'));
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp(options);
    }

    if (preOpResult) {
      if (options.hasOwnProperty('body')) {
        result = Model.createAsync(options.body);
      }
    }

    return result;
  };

  var set = (options)=> {
    let result = Promise.reject(new Error('Pre op failed.'));
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp(options);
    }

    if (preOpResult) {
      if (options.hasOwnProperty('body')) {
        result = Model.updateAsync(options.body);
      }
    }

    return result;
  };

  var del = (options)=> {
    let result = Promise.reject(new Error('Pre op failed.'));
    let preOpResult = true;
    if (options.hasOwnProperty('preOp') && options.preOp !== undefined && options.preOp !== null) {
      preOpResult = options.preOp();
    }

    if (preOpResult) {
      if (options && options.hasOwnProperty('query') && options.query.hasOwnProperty('id')) {
        result = Model.destroyAsync(options.query.id.toString());
      } else {
        // TODO: Somehow notify that the id is missing...
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
