/// <reference path="../../../../typings/tsd.d.ts" />
var FieldError = require("../services/FieldError");
var User = (function () {
    function User($log, $q, $timeout, LoginService) {
        this._username = "";
        this._password = "";
        this._errors = new Array();
        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
        this.LoginService = LoginService;
    }
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (new_val) {
            this._username = new_val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (new_val) {
            this._password = new_val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.clearErrors = function () {
        this._errors = [];
    };
    User.prototype.login = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.clearErrors();
        this.$log.debug("admin: %s, password: %s", this.username, this.password);
        this.$timeout(function () {
            if (_this.username == "admin" && _this.password == "admin") {
                _this.$log.debug("admin, deferred.resolve()");
                deferred.resolve(true);
            }
            else if (_this.username == "manager" && _this.password == "manager") {
                _this.$log.debug("manager, deferred.resolve()");
                deferred.resolve(true);
            }
            else {
                var error = new FieldError("username", "Invalid user name or password");
                _this._errors.push(error);
                deferred.reject(false);
            }
        }, 1);
        return deferred.promise;
    };
    return User;
})();
module.exports = User;
