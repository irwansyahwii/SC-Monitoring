'use strict';

the_module = angular.module('dea.common.services', []);


routing_service = require("./routing_service")

the_module.factory("RoutingService", routing_service.factory)

module.exports = the_module
  