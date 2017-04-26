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
        // var hasKey = 'google-oauth2|107593470509194206658';
        var date = new Date(),
            hasKey = options.query.author.toString(),
            rangeKey = 'createdAt';

        date.setDate(date.getDate() - 9);

        return Model
            .query(hasKey)
            .where(rangeKey)
            .gt(date.toISOString())
            .descending()
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