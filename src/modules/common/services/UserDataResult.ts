import SC = require("../domain_models/SC");
import FieldError = require("./FieldError");

class UserDataResult {
    public errors: FieldError[];
    public roles: string[];
    public list_of_new_sc:  SC[];
    public list_of_approved_sc: SC[];
    public list_of_rejected_sc: SC[];
    public list_of_po_sc: SC[];
    public list_of_gr_sc: SC[];

    constructor() {
        this.errors = [];
        this.roles = [];
        this.list_of_new_sc = [];
        this.list_of_approved_sc = [];
        this.list_of_rejected_sc = [];
        this.list_of_po_sc = [];
        this.list_of_gr_sc = [];
    }
}

export = UserDataResult;