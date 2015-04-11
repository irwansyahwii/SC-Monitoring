import SC = require("../domain_models/SC");
import FieldError = require("./FieldError");

class UserDataResult {
    errors: FieldError[];
    roles: string[];
    list_of_new_sc:  SC[];
    list_of_approved_sc: SC[];
    list_of_rejected_sc: SC[];
    list_of_po_sc: SC[];
    list_of_gr_sc: SC[];
}

export = UserDataResult;