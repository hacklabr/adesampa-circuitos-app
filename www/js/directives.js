angular.module('app.directives', [])

.directive('mapRoot', function(Map) {
    return {
        link: function(scope, element, attr) {
            Map.setRootDOM(element[0]);
        },
    }
})

.directive('mapContainer', function(Map, $ionicHistory) {
    return {
        link: function(scope, element, attr) {
            var currentState = $ionicHistory.currentView().stateName
            Map.createTarget(attr.dataset, attr.target, element[0], attr.linkpath, currentState);
        },
   };
})

.directive('blankDirective', [function(){

}]);

