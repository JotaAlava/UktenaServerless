/**
 * Created by jalava on 3/21/2017.
 */
function CrudSvc(repo, preOps) {
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

    var options = {};

    if (preOps && preOps.hasOwnProperty('get')) {
      options.preOps = {
        get: preOps.get
      }
    }

    if (event.hasOwnProperty('path') && event.path.hasOwnProperty('id')) {
      options.query = {
        id: event.path.id
      }
    }

    repo.get(options)
      .then(function (data) {
        RESPONSE.OK.data = data;
        callback(null, RESPONSE.OK);
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

    var options = {};

    if (preOps && preOps.hasOwnProperty('delete')) {
      options.preOps = {
        delete: preOps.delete
      }
    }

    if (event.hasOwnProperty('path') && event.path.hasOwnProperty('id')) {
      options.query = {
        id: event.path.id
      }
    }

    repo.delete(options)
      .then(function (data) {
        RESPONSE.OK.data = data;
        callback(null, RESPONSE.OK);
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

    var options = {};

    if (preOps && preOps.hasOwnProperty('post')) {
      options.preOps = {
        post: preOps.post
      }
    }

    if (parsedBody) {
      options.body = parsedBody;
    }

    repo.add(options)
      .then(function (data) {
        callback(null, [data.attrs]);
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

    var options = {};

    if (preOps && preOps.hasOwnProperty('put')) {
      options.preOps = {
        put: preOps.put
      }
    }

    if (parsedBody) {
      options.body = parsedBody;
    }

    repo.set(options)
      .then(function (data) {
        callback(null, RESPONSE.OK);
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