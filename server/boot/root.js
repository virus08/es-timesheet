// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-example-passport
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  //var User_Profiles = app.models.user-profile;
  router.get('/status', server.loopback.status());
  server.use(router);
  
};
