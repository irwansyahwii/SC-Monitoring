import SC = require("../domain_models/SC");

class UserDataResult {
    roles: string[];
    list_of_new_sc:  SC[];
    list_of_approved_sc: SC[];
    list_of_rejected_sc: SC[];
    list_of_po_sc: SC[];
    list_of_gr_sc: SC[];
}

export = UserDataResult;