var SCStatus = require("./SCStatus");
var SCPOInfo = require("./SCPOInfo");
var SCGRInfo = require("./SCGRInfo");
var SC = (function () {
    function SC() {
        this.sc_number = "";
        this.project_name = "";
        this.pm_name = "";
        this.currency = "";
        this.sc_value = 0;
        this.cost_center = "";
        this.gl_account = "";
        this.business_area = "";
        this.vendor = "";
        this.status = 0 /* New */;
        this.fully_approved_date = "";
        this.rejected_date = "";
        this.rejected_message = "";
        this.POInfo = new SCPOInfo();
        this.GRInfo = new SCGRInfo();
    }
    return SC;
})();
module.exports = SC;
