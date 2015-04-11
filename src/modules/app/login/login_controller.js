/// <reference path="../../../../typings/tsd.d.ts" />
var User = require("../../common/domain_models/user");
var LoginController = (function () {
    function LoginController($scope, $log, RoutingService, $q, $timeout) {
        var _this = this;
        this.$log = $log;
        $scope.user = new User($log, $q, $timeout);
        $scope.login = function () {
            $log.debug("scope.login executing...");
            $scope.user.login().then(function (login_result) {
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
                function ($scope, $log, RoutingService, $q, $timeout) {
                    var controller = new LoginController($scope, $log, RoutingService, $q, $timeout);
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
