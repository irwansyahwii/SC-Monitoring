the_module = angular.module("dea.main_screen", [])

the_module.config(["$stateProvider",
        ($stateProvider) ->
            console.log("main_screen/index.coffee")
            
            $stateProvider.state "main_for_manager",
                url: "/main"
                templateUrl: "app/main_screen/main_for_manager.html"
                controller: "MainForManagerController"

            $stateProvider.state "main_for_manager.tab_new_view",
                url:"/new"
                views:
                    "tab_new_view":
                        templateUrl: "app/main_screen/list_of_new_sc_for_manager.html"   

            $stateProvider.state "main_for_manager.show_detail_sc",
                url:"/detail"
                views:
                    "tab_new_view":
                        templateUrl: "app/main_screen/show_detail_sc.html"   


            $stateProvider.state "main_for_manager.tab_payment_status_view",
                url:"/payment_status"
                views:
                    "tab_payment_status_view":
                        templateUrl: "app/main_screen/list_of_payment_status_sc_for_manager.html"        

            $stateProvider.state "main_for_manager.tab_payment_status_view.approved",
                url: "/approved"
                # templateUrl: "app/main_screen/approved_list_view.html"                        
                views:
                    "list_view":
                        templateUrl: "app/main_screen/approved_list_view.html"        
            $stateProvider.state "main_for_manager.tab_payment_status_view.po",
                url: "/po"
                views:
                    "list_view":
                        templateUrl: "app/main_screen/po_list_view.html"        
            $stateProvider.state "main_for_manager.tab_payment_status_view.gr",
                url: "/gr"
                views:
                    "list_view":
                        templateUrl: "app/main_screen/gr_list_view.html"       

            $stateProvider.state "main_for_manager.approved_show_detail_sc",
                url:"/approved_detail"
                views:
                    "tab_payment_status_view":
                        templateUrl: "app/main_screen/show_detail_sc.html"   
            $stateProvider.state "main_for_manager.po_show_detail_sc",
                url:"/po_detail"
                views:
                    "tab_payment_status_view":
                        templateUrl: "app/main_screen/show_detail_po_sc.html"   
            $stateProvider.state "main_for_manager.gr_show_detail_sc",
                url:"/gr_detail"
                views:
                    "tab_payment_status_view":
                        templateUrl: "app/main_screen/show_detail_sc.html"   

    ])

main_for_manager_controller = require("./main_for_manager_controller")

the_module.controller("MainForManagerController", main_for_manager_controller.factory)

module.exports = the_module