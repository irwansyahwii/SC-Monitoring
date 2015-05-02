interface IRoutingService{
    gotoMainScreen();
    gotoListOfNewSCScreen();
    gotoListOfPaymentStatusScreen() ;
    showPaymentStatusListView(button_bar_id) ;
    showTabNewDetailSC(sc);
    showTabPaymentStatusApprovedDetailSC(sc);
    showTabPaymentStatusPODetailSC(sc);
    showTabPaymentStatusGRDetailSC(sc);
    gotoListOfRejectedScreen();
    showTabRejectedDetailSC(sc);
    showNewSCScreen();
    showEditSCScreen(sc);
    gotoLoginScreen();
}

export = IRoutingService;