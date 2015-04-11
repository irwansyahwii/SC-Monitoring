import SCStatus = require("./SCStatus");
import SCPOInfo = require("./SCPOInfo");
import SCGRInfo = require("./SCGRInfo");

class SC{
    sc_number: string = "";
    project_name: string = "";
    pm_name : string = "";
    currency : string = "";
    sc_value: number = 0;
    cost_center: string = "";
    gl_account: string = "";
    business_area: string = "";
    vendor: string = "";
    status: SCStatus = SCStatus.New;
    fully_approved_date: string = "";
    rejected_date: string = "";
    rejected_message: string = "";    
    POInfo : SCPOInfo = new SCPOInfo();
    GRInfo : SCGRInfo = new SCGRInfo();
}

export = SC;