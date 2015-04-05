// Generated by CoffeeScript 1.9.1
(function() {
  'use strict';
  var LoginController, User;

  User = require("User");

  LoginController = (function() {
    LoginController.factory = [
      "$scope", "$log", "RoutingService", "$q", "$timeout", function($scope, $log, RoutingService, $q, $timeout) {
        var controller;
        controller = new LoginController($scope, $log, RoutingService, $q, $timeout);
        return controller;
      }
    ];

    function LoginController(scope, log, RoutingService1, q, timeout) {
      this.scope = scope;
      this.log = log;
      this.RoutingService = RoutingService1;
      this.q = q;
      this.timeout = timeout;
      this.scope.user = new User(this.log, this.q, this.timeout);
      this.scope.login = (function(_this) {
        return function() {
          _this.log.debug("scope.login executing...");
          _this.scope.user.login().then(function(login_result) {
            return _this.RoutingService.gotoMainScreen();
          })["catch"](function(error) {
            return _this.displayError(_this.scope.user.errors);
          });
          return _this.log.debug("scope.login END");
        };
      })(this);
    }

    LoginController.prototype.displayError = function(errors) {
      this.log.debug("alertify:");
      this.log.debug(alertify);
      alertify.set("notifier", "position", "bottom-right");
      return alertify.error("Please enter your username");
    };

    return LoginController;

  })();

  module.exports = LoginController;

}).call(this);
