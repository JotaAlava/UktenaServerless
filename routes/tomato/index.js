/**
 * Created by jalava on 3/22/2017.
 */
var db = require('../../repo'),
  Property = require('../../models/tomato'),
  repo = new db(Property),
  _ = require('underscore'),
  crudSvc = new require('../../crudSvc')(repo, undefined, {
    get: function (data) {
      var itemsAsArray = data.Items.length === 1 ? [data.Items[0].attrs] : _.map(data.Items, function (val, key, list) {
        return val.attrs;
      });

      var listOfTomatoes = {};
      // TODO: Refactor this madness, test it!
      var groupedItems = _.groupBy(itemsAsArray, function (item, val) {
        return new Date(item.createdAt).toLocaleDateString();
      });

      var result = [];
      _.each(groupedItems, function (val, key, item) {
        var obj = {};
        obj[key] = val;
        result.push(obj);
      });

      _.each(result.reverse(), function (val, key, list) {
        var nameOfProperty = Object.keys(val)[0]; // Should always be only one
        listOfTomatoes[nameOfProperty] = val[nameOfProperty];
      });

      return result;
    }
  }),
  router = new require('../../router')(crudSvc.get, crudSvc.post, crudSvc.put, crudSvc.del);

module.exports.main = router;


var sut = require('./index');

sut.main({method:'GET'}, console.log, console.log);