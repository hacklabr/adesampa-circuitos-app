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
        template: '<div style="position: absolute; bottom: 10px; left: 15px; z-index: 10000; font-size: 3em; color: #2222FF;"><i class="icon ion-android-locate"></i></div>',
        link: function(scope, element, attr) {
            var locationButton = element[0].children[0].children[0];
            if (!attr.linkpath){
                element[0].innerHTML = '';
                locationButton = null;
            }
            var currentState = $ionicHistory.currentView().stateName
            Map.createTarget(attr.dataset, attr.target, element[0], locationButton, attr.linkpath, currentState);
        },
   };
})

.directive('blankDirective', [function(){

}]);

