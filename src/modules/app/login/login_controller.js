/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../../common/domain_models/user");
var LoginController = (function () {
    function LoginController($scope, $log, RoutingService, $q, $timeout, LoginService, UserDataInitializer) {
        var _this = this;
        this.$log = $log;
        $scope.user = new User($log, $q, $timeout, LoginService, UserDataInitializer);
        $scope.login = function () {
            $log.debug("scope.login executing...");
            $scope.user.login().then(function (login_result) {
                RoutingService.gotoMainScreen();
            }).catch(function (error) {
                _this.displayError($scope.user);
            });
        };
    }
    Object.defineProperty(LoginController, "factory", {
        get: function () {
            var arr = [
                "$scope",
                "$log",
                "RoutingService",
                "$q",
                "$timeout",
                "LoginService",
                "UserDataInitializerService",
                function ($scope, $log, RoutingService, $q, $timeout, LoginService, UserDataInitializer) {
                    var controller = new LoginController($scope, $log, RoutingService, $q, $timeout, LoginService, UserDataInitializer);
                    return controller;
                }
            ];
            return arr;
        },
        enumerable: true,
        configurable: true
    });
    LoginController.prototype.displayError = function (user) {
        user.errors.forEach(function (err, i) {
            alertify.set("notifier", "position", "bottom-right");
            alertify.error(err.error_message);
        });
    };
    return LoginController;
})();
module.exports = LoginController;
