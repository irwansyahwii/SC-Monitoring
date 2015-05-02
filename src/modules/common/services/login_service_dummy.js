/// <reference path="../../../../typings/tsd.d.ts" />
var LoginResult = require("./LoginResult");
var FieldError = require("./FieldError");
var LoginService = (function () {
    function LoginService($q, $timeout, $log) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$log = $log;
    }
    Object.defineProperty(LoginService, "factory", {
        get: function () {
            return ["$q", "$timeout", "$log", function ($q, $timeout, $log) {
                var service = new LoginService($q, $timeout, $log);
                return service;
            }];
        },
        enumerable: true,
        configurable: true
    });
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        var deferred = this.$q.defer();
        var result = new LoginResult();
        this.$timeout(function () {
            if (username == "admin" && password == "admin") {
                _this.$log.debug("admin, deferred.resolve()");
                deferred.resolve(result);
            }
            else if (username == "manager" && password == "manager") {
                _this.$log.debug("manager, deferred.resolve()");
                deferred.resolve(result);
            }
            else {
                var errors = new Array();
                var error = new FieldError("username", "Invalid user name or password");
                errors.push(error);
                result.errors = errors;
                deferred.reject(result);
            }
        }, 1);
        return deferred.promise;
    };
    LoginService.prototype.logout = function () {
        var deferred = this.$q.defer();
        this.$timeout(function () {
            deferred.resolve(null);
        }, 1);
        return deferred.promise;
    };
    return LoginService;
})();
module.exports = LoginService;
