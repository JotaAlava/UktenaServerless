/**
 * Created by jalava on 3/22/2017.
 */
var db = require('../../../repo'),
    Property = require('../../../models/property'),
    repo = new db(Property),
    crudSvc = new require('../../../crudSvc')(repo),
    router = new require('../../../router')(crudSvc.get, crudSvc.post, crudSvc.put, crudSvc.del);

module.exports.main = router;