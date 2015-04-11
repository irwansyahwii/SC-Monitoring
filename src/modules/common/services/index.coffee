'use strict';

the_module = angular.module('dea.common.services', []);


routing_service = require("./routing_service")
login_service = require("./login_service_dummy")

the_module.factory("RoutingService", routing_service.factory)
the_module.factory("LoginService", login_service.factory)

module.exports = the_module
  