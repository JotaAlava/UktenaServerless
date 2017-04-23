/**
 * Created by jalava on 4/4/2017.
 */
'use strict';
var request = require('request'),
  Promise = require('bluebird'),
  jwtVerify = Promise.promisify(require('jsonwebtoken').verify),
  env = require('../config');

function getUserProfile(authToken) {
  var domain = env.DOMAIN,
    body = {
      'id_token': authToken
    };

  var options = {
    url: 'https://' + domain + '/tokeninfo',
    method: 'POST',
    json: true,
    body: body
  };

  return jwtVerify(authToken, env.AUTH0_SECRET).then(function (decoded) {
    options.isSuccess = true;
    options.principalId = decoded.sub;
    return request(options);
  }).catch(function (error) {
    var result = {
      isSuccess: false,
      body: error
    };
    console.log(JSON.stringify(error));
    return result;
  });
}

module.exports = {
  // Will verify the user and then return a profile
  getUserProfile: getUserProfile
};