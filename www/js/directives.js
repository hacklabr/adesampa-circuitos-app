angular.module('app.directives', [])

.directive('mapRoot', function(Map) {
    return {
        link: function(scope, element, attr) {
            Map.setRootDOM(element[0]);
        },
    }
})

.directive('mapContainer', function(Map) {
    return {
        link: function(scope, element, attr) {
            Map.createTarget(attr.dataset, attr.target, element[0], attr.linkpath);
        },
   };
})

.directive('blankDirective', [function(){

}]);

