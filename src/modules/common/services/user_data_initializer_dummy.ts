/// <reference path="../../../../typings/tsd.d.ts" />

import IUserDataInitializer = require("./IUserDataInitializer");
import UserDataResult = require("./UserDataResult");
import SC = require("../domain_models/SC");


class UserDataInitializer implements IUserDataInitializer{

    static get factory(): any[] {
        var result: any[] = [
            "$q",
            "$timeout",
            "$log",
            ($q, $timeout, $log) => {
                var service = new UserDataInitializer($q, $timeout, $log);
                return service;
            }
        ];

        return result;
    }

    private $q: ng.IQService;
    private $timeout: ng.ITimeoutService;
    private $log: ng.ILogService;

    constructor($q: ng.IQService, $timeout: ng.ITimeoutService, $log:ng.ILogService) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$log = $log;
    }

    create_list_of_new_sc() : SC[] {
        var result: SC[] = new Array<SC>();

        var sc:SC = new SC();
        sc.sc_number = "123456701";
        sc.project_name = "Renewal Sewa Genset 2015"
        sc.created_date = "23/3/2015";

        result.push(sc);


        sc = new SC();
        sc.sc_number = "123456702";
        sc.project_name = "Renewal Sewa Radio 2015"
        sc.created_date = "8/4/2015";

        result.push(sc);

        return result;
    }

    retrieve_user_data(username: string):ng.IPromise<UserDataResult> {
        var deferred = this.$q.defer();



        var result:UserDataResult = new UserDataResult();

        this.$timeout(() => {
                if(username === "manager"){
                    result.roles = ["manager"];
                }
                else{
                    result.roles = ["admin"];
                }
                result.list_of_new_sc = this.create_list_of_new_sc();

                deferred.resolve(result);
            }, 1);        

        return deferred.promise;
    }
}

export = UserDataInitializer;