/// <reference path="../../../../typings/tsd.d.ts" />
var UserDataResult = require("../services/UserDataResult");
var _current_user = null;
var User = (function () {
    function User($log, $q, $timeout, LoginService, UserDataInitializer) {
        this._username = "admin";
        this._password = "admin";
        this._errors = new Array();
        this._roles = new Array();
        this._data = new UserDataResult();
        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
        this.LoginService = LoginService;
        this.UserDataInitializer = UserDataInitializer;
    }
    Object.defineProperty(User, "current_user", {
        get: function () {
            return _current_user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(User.prototype, "roles", {
        get: function () {
            return this._roles;
        },
        set: function (val) {
            this._roles = val;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.clearErrors = function () {
        this._errors = [];
    };
    User.prototype.logout = function () {
        var deferred = this.$q.defer();
        User.current_user = null;
        this.LoginService.logout().then(function () {
            deferred.resolve();
        }).catch(function () {
            deferred.reject();
        });
        return deferred.promise;
    };
    User.prototype.assign_user_data = function (data) {
        this.roles = data.roles;
        this._data = data;
    };
    User.prototype.login = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.clearErrors();
        this.$log.debug("User entry: username: %s, password: %s", this.username, this.password);
        this.LoginService.login(this.username, this.password).then(function (login_result) {
            _current_user = _this;
            _this.$log.debug("User.current_user:");
            _this.$log.debug(User.current_user);
            _this.UserDataInitializer.retrieve_user_data(_this.username).then(function (result) {
                _this.$log.debug("UserDataResult:");
                _this.$log.debug(result);
                _this.assign_user_data(result);
                deferred.resolve();
            }).catch(function (result) {
                _this._errors = result.errors;
                deferred.reject();
            });
        }).catch(function (login_result) {
            _this._errors = login_result.errors;
            deferred.reject();
        });
        return deferred.promise;
    };
    return User;
})();
module.exports = User;
