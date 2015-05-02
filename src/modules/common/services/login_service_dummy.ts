/// <reference path="../../../../typings/tsd.d.ts" />

import LoginResult = require("./LoginResult");
import ILoginService = require("./ILoginService");
import FieldError = require("./FieldError");

class LoginService implements ILoginService {
    static get factory(): any[] {
        return ["$q", "$timeout", "$log", 
                ($q, $timeout, $log) => {
                    var service = new LoginService($q, $timeout, $log);

                    return service;
                }];
    }

    private $timeout: ng.ITimeoutService;
    private $q: ng.IQService;
    private $log: ng.ILogService;

    constructor($q: ng.IQService, $timeout: ng.ITimeoutService, $log: ng.ILogService) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$log = $log;
    }
    
    login(username:string, password:string):ng.IPromise<any> {
        var deferred:ng.IDeferred<any> = this.$q.defer();

        var result:LoginResult = new LoginResult();

        this.$timeout(() => {
                if(username == "admin" && password == "admin") {
                    this.$log.debug("admin, deferred.resolve()");
                    deferred.resolve(result);                    
                }
                else if(username == "manager" && password == "manager") {
                    this.$log.debug("manager, deferred.resolve()");
                    deferred.resolve(result);                    
                }
                else{                    
                    var errors:FieldError[] = new Array<FieldError>();

                    var error:FieldError = new FieldError("username", "Invalid user name or password");
                    errors.push(error);

                    result.errors = errors;

                    deferred.reject(result);                    
                }
            }, 1);

        return deferred.promise;

    }
    logout():ng.IPromise<any>{
        var deferred:ng.IDeferred<any> = this.$q.defer();

        this.$timeout(() => {
                deferred.resolve(null);
            }, 1);

        return deferred.promise;
    }
}

export = LoginService;