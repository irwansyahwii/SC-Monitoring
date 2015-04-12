/// <reference path="../../../../typings/tsd.d.ts" />
var UserDataResult = require("./UserDataResult");
var SC = require("../domain_models/SC");
var UserDataInitializer = (function () {
    function UserDataInitializer($q, $timeout, $log) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$log = $log;
    }
    Object.defineProperty(UserDataInitializer, "factory", {
        get: function () {
            var result = [
                "$q",
                "$timeout",
                "$log",
                function ($q, $timeout, $log) {
                    var service = new UserDataInitializer($q, $timeout, $log);
                    return service;
                }
            ];
            return result;
        },
        enumerable: true,
        configurable: true
    });
    UserDataInitializer.prototype.create_list_of_new_sc = function () {
        var result = new Array();
        var sc = new SC();
        sc.sc_number = "123456701";
        sc.project_name = "Renewal Sewa Genset 2015";
        sc.pm_name = "Andri";
        sc.currency = "IDR";
        sc.sc_value = 15000000;
        sc.quantity = 6;
        sc.created_date = "1/2/2015";
        sc.cost_center = "C63CU";
        sc.gl_account = "5030200000";
        sc.business_area = "2110";
        sc.vendor = "Mitra Jaringan Global";
        result.push(sc);
        sc = new SC();
        sc.sc_number = "123456702";
        sc.project_name = "Renewal Sewa Radio 2015";
        sc.created_date = "8/4/2015";
        result.push(sc);
        return result;
    };
    UserDataInitializer.prototype.create_list_of_approved_sc = function () {
        var result = new Array();
        var sc = new SC();
        sc.sc_number = "123456501";
        sc.project_name = "Renewal Sewa Genset 2014";
        sc.created_date = "23/3/2015";
        result.push(sc);
        sc = new SC();
        sc.sc_number = "123456502";
        sc.project_name = "Renewal Sewa Radio 2013";
        sc.created_date = "8/4/2015";
        result.push(sc);
        return result;
    };
    UserDataInitializer.prototype.retrieve_user_data = function (username) {
        var _this = this;
        var deferred = this.$q.defer();
        var result = new UserDataResult();
        this.$timeout(function () {
            if (username === "manager") {
                result.roles = ["manager"];
            }
            else {
                result.roles = ["admin"];
            }
            result.list_of_new_sc = _this.create_list_of_new_sc();
            result.list_of_approved_sc = _this.create_list_of_approved_sc();
            deferred.resolve(result);
        }, 1);
        return deferred.promise;
    };
    return UserDataInitializer;
})();
module.exports = UserDataInitializer;
