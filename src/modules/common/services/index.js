/// <reference path="../../../../typings/tsd.d.ts" />
var the_module = angular.module('dea.common.services', []);
var routing_service = require("./routing_service_router");
var login_service = require("./login_service_dummy");
var user_data_initializer_service = require("./user_data_initializer_dummy");
the_module.factory("RoutingService", routing_service.factory);
the_module.factory("LoginService", login_service.factory);
the_module.factory("UserDataInitializerService", user_data_initializer_service.factory);
module.exports = the_module;
