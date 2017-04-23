var tomatoSorter = require('./tomatoSorter');
/**
 * Created by jalava on 3/22/2017.
 */
var db = require('../../repo'),
  Property = require('../../models/tomato'),
  repo = new db(Property),
  crudSvc = new require('../../crudSvc')(repo, undefined, {
    get: tomatoSorter
  }),
  router = new require('../../router')(crudSvc.get, crudSvc.post, crudSvc.put, crudSvc.del);

module.exports.main = router;


//var sut = require('./index');
//sut.main({method: 'GET'}, console.log, console.log);