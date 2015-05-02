import SC = require("../../common/domain_models/SC");

interface INewSCControllerScope{
    save():void;
    new_sc: SC;
}

export = INewSCControllerScope;