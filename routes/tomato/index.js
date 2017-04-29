/**
 * Created by jalava on 3/22/2017.
 */
var tomatoSorter = require('./tomatoSorter'),
    postOp = {
        get: tomatoSorter
    },
    preOps = {
        post: function (options) {
            options.body.author = options.event.principalId;
            return true;
        }
    };

var customOps = {
    get: function (Model, options) {
        // TODO: Find a way to execute both custom, and default getters within a repo.
        // TODO: Or maybe once there is a custom then we have to implement all customs? No fallthrough to the default queries?
        // var hasKey = 'google-oauth2|107593470509194206658';
        var date = new Date(),
        // In this case, the id for the tomato is the author id
            hashKey = options.event.principalId,
            rangeKey = 'createdAt';

        date.setDate(date.getDate() - 9);

        return Model
            .query(hashKey)
            .usingIndex('QueryIndex')
            .where(rangeKey)
            .gt(date.toISOString())
            .descending();
    }
};

var db = require('../../repo'),
    Tomato = require('../../models/tomato'),
    repo = new db(Tomato, customOps),
    crudSvc = new require('../../crudSvc')(repo, preOps, postOp),
    router = new require('../../router')(crudSvc.get, crudSvc.post, crudSvc.put, crudSvc.del);

module.exports.main = router;

//var sut = require('./index');
//sut.main({method: 'GET'}, console.log, console.log);