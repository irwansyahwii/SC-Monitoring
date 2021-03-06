// Generated by CoffeeScript 1.9.1
(function() {
  var main_for_manager_controller, the_module;

  the_module = angular.module("dea.main_screen", []);

  the_module.config([
    "$stateProvider", function($stateProvider) {
      $stateProvider.state("main_for_manager", {
        url: "/main",
        templateUrl: "app/main_screen/main_for_manager.html",
        controller: "MainForManagerController"
      });
      $stateProvider.state("main_for_manager.tab_new_view", {
        views: {
          "tab_new_view": {
            templateUrl: "app/main_screen/list_of_new_sc_for_manager.html"
          }
        }
      });
      return $stateProvider.state("main_for_manager.tab_payment_status_view", {
        views: {
          "tab_payment_status_view": {
            templateUrl: "app/main_screen/list_of_payment_status_sc_for_manager.html"
          }
        }
      });
    }
  ]);

  main_for_manager_controller = require("./main_for_manager_controller");

  the_module.controller("MainForManagerController", main_for_manager_controller.factory);

  module.exports = the_module;

}).call(this);
