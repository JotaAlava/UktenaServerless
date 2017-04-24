/**
 * Created by jalava on 3/22/2017.
 */
var tomatoSorter = require('./tomatoSorter'),
  postOp = {
    get: tomatoSorter
  },
  preOps = {
    post: function (options) {
      console.log(options.body);
      options.body.author = options.event.principalId;
      console.log(options.body);

      return true;
    }
  };

var db = require('../../repo'),
  Property = require('../../models/tomato'),
  repo = new db(Property),
  crudSvc = new require('../../crudSvc')(repo, preOps, postOp),
  router = new require('../../router')(crudSvc.get, crudSvc.post, crudSvc.put, crudSvc.del);

module.exports.main = router;


//var sut = require('./index');
//sut.main({method: 'GET'}, console.log, console.log);