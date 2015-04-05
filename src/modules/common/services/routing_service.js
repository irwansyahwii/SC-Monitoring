// Generated by CoffeeScript 1.9.1
(function() {
  var RoutingService;

  RoutingService = (function() {
    RoutingService.factory = [
      "$state", function($state) {
        var service;
        service = new RoutingService($state);
        return service;
      }
    ];

    function RoutingService(state) {
      this.state = state;
    }

    RoutingService.prototype.gotoMainScreen = function() {
      return this.state.go("main");
    };

    return RoutingService;

  })();

  module.exports = RoutingService;

}).call(this);
