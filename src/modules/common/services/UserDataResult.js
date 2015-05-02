var UserDataResult = (function () {
    function UserDataResult() {
        this.errors = [];
        this.roles = [];
        this.list_of_new_sc = [];
        this.list_of_approved_sc = [];
        this.list_of_rejected_sc = [];
        this.list_of_po_sc = [];
        this.list_of_gr_sc = [];
    }
    return UserDataResult;
})();
module.exports = UserDataResult;
