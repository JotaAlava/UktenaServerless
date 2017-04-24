/**
 * Created by jalava on 3/21/2017.
 */
function CrudSvc(repo, preOps, postOps) {
  function safeRunPostOps(verb, data) {
    var result;

    if (postOps && postOps.hasOwnProperty(verb)) {
      result = postOps[verb](data);
    } else {
      result = data;
    }

    return result;
  }

  function safeRunPreOps(verb, options) {
    if (preOps && preOps.hasOwnProperty(verb)) {
      options.preOps = {};
      options.preOps[verb] = preOps[verb];
    }

    return options;
  }

  var get = (event, context, callback) => {
    const RESPONSE = {
      OK: {
        statusCode: 200,
        message: []
      },
      ERROR: {
        status: 400,
        message: 'Something went wrong. Please try again.'
      }
    };

    var options = safeRunPreOps('get', {
      event,
      context
    });

    if (event.hasOwnProperty('path') && event.path.hasOwnProperty('id')) {
      options.query = {
        id: event.path.id
      }
    }

    repo.get(options)
      .then(function (data) {
        var postOpResult = safeRunPostOps('get', data);

        if (postOpResult.then) {
          postOpResult.then(function (postOpResult) {
            callback(null, postOpResult);
          });
        } else {
          callback(null, postOpResult);
        }
      }, function (err) {
        RESPONSE.ERROR.err = err;
        callback(null, RESPONSE.ERROR);
      });
  };

  var del = (event, context, callback)=> {
    const RESPONSE = {
      OK: {
        statusCode: 204,
        message: []
      },
      ERROR: {
        status: 400,
        message: 'Something went wrong. Please try again.'
      }
    };

    var options = safeRunPreOps('delete', {
      event,
      context
    });

    if (event.hasOwnProperty('path') && event.path.hasOwnProperty('id')) {
      options.query = {
        id: event.path.id
      }
    }

    repo.delete(options)
      .then(function (data) {
        callback(null, safeRunPostOps('delete', data));
      }, function (err) {
        RESPONSE.ERROR.err = err;
        callback(null, RESPONSE.ERROR);
      });
  };

  var add = (event, context, callback) => {
    var parsedBody = event.body;

    const RESPONSE = {
      OK: {
        statusCode: 201,
        message: []
      },
      ERROR: {
        status: 400,
        message: 'Something went wrong. Please try again.'
      }
    };

    var options = safeRunPreOps('post', {
      event,
      context
    });

    if (parsedBody) {
      options.body = parsedBody;
    }

    repo.add(options)
      .then(function (data) {
        callback(null, safeRunPostOps('post', data));
      }, function (err) {
        RESPONSE.ERROR.err = err;
        callback(null, RESPONSE.ERROR);
      });
  };

  var set = (event, context, callback) => {
    var parsedBody = event.body;

    const RESPONSE = {
      OK: {
        statusCode: 204,
        message: []
      },
      ERROR: {
        status: 400,
        message: 'Something went wrong. Please try again.'
      }
    };

    var options = safeRunPreOps('put', {
      event,
      context
    });

    if (parsedBody) {
      options.body = parsedBody;
    }

    repo.set(options)
      .then(function (data) {
        callback(null, safeRunPostOps('put', data));
      }, function (err) {
        RESPONSE.ERROR.err = err;
        callback(null, RESPONSE.ERROR);
      });
  };

  return {
    get: get,
    post: add,
    put: set,
    del: del
  }
}

module.exports = CrudSvc;