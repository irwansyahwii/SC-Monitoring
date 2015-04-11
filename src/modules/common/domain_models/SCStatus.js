var SCStatus;
(function (SCStatus) {
    SCStatus[SCStatus["New"] = 0] = "New";
    SCStatus[SCStatus["Approved"] = 1] = "Approved";
    SCStatus[SCStatus["PO"] = 2] = "PO";
    SCStatus[SCStatus["GR"] = 3] = "GR";
    SCStatus[SCStatus["Rejected"] = 4] = "Rejected";
})(SCStatus || (SCStatus = {}));
module.exports = SCStatus;
