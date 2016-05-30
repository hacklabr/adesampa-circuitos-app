angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('mapCtrl', function($scope) {

})
   
.controller('routesCtrl', function($scope, Storage) {
    $scope.routes = Storage.listRoutes();
})
         
.controller('faqsCtrl', function($scope) {

})
   
.controller('shopkeeperCtrl', function($scope) {

})
   
.controller('routesListCtrl', function($scope, Storage) {
    var userRoutes = JSON.parse(JSON.stringify(Storage.listUserRoutes()));
    for (var i=0; i<userRoutes.length; i++) {
        userRoutes[i].route = Storage.getRoute(userRoutes[i].route);
    }
    $scope.userRoutes = userRoutes;
})
   
.controller('shopsListCtrl', [ 'API', '$scope', '$stateParams', 'Storage', 'UserRoutes', function(API, $scope, $stateParams, Storage, UserRoutes) {
    var userRoute = UserRoutes.get($stateParams.userRouteId);
    $scope.route = Storage.getRoute(userRoute.route);
    $scope.created = userRoute.created;
    if (userRoute.shops) {
        $scope.shops = userRoute.shops;
        return;
    }

    API.applyMe.apply($scope)
    var route = Storage.getRoute(userRoute.route)
    API.find({regiao: $EQ(route.title)}).then(function (shops) {
        UserRoutes.storeShops($stateParams.userRouteId, shops);
        $scope.shops = shops;
    });
}])
   
.controller('bookmarksCtrl', function($scope) {

})

.controller('shopSingleCtrl', [ 'API', '$scope', '$stateParams', function(API, $scope, $stateParams) {
    API.applyMe.apply($scope);
    API.findOne({id: $EQ($stateParams.shop)}).then(function (shop) {
        // TODO: remover isso depois de arrumar os dados no servidor
        if (shop.emailPublico.match(/^E-mail: /)) {
            shop.emailPublico = shop.emailPublico.replace(/^E-mail: /, '');
        }
        if (shop.telefonePublico) {
            shop.phoneHref = shop.telefonePublico.replace(/\D/g, '').replace(/^/, '+55');
        }
        $scope.shop = shop;
    });
}])
   
.controller('routeSingleCtrl', function($scope, $stateParams, Storage, UserRoutes) {
    $scope.route = Storage.getRoute($stateParams.route);
    $scope.createUserRoute = function() {
        $scope.userRouteId = UserRoutes.create($stateParams.route)
    };
})
 
