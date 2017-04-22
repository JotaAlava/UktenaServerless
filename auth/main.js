/**
 * Created by jalava on 4/4/2017.
 */
'use strict';
var userProfile = require('./userProfile');

module.exports.verifyToken = (event, context, callback) => {
  var token = event.authorizationToken.split(' ')[1];
  var authToken = token || event.authorizationToken;
  console.log('token as it will be used: ' + authToken);
  userProfile.getUserProfile(authToken).then(function (tokenRes) {
    var policy = generatePolicy('user', 'Allow', '*');

    if (tokenRes.isSuccess) {
      context.succeed(policy);
    } else {
      context.fail("Unauthorized");
    }
  }).catch(function (error) {
    context.fail("Unauthorized");
  })
};

var generatePolicy = function (principalId, effect, resource) {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};