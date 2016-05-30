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
   
.controller('shopsListCtrl', function(API, $scope, $stateParams, Storage, UserRoutes, Util) {
    var userRoute = UserRoutes.get($stateParams.userRouteId);
    $scope.route = Storage.getRoute(userRoute.route);
    $scope.created = userRoute.created;
    $scope.categories = userRoute.categories;

    $scope.addBookmark = function(shop) {
        Storage.storeBookmark(shop);
    };
    $scope.removeBookmark = function(shop) {
        Storage.removeBookmark(shop.id);
    };
    $scope.isBookmark = function(shop) {
        return Storage.isBookmark(shop.id);
    }

    if (userRoute.shops) {
        $scope.shops = userRoute.shops;
        return;
    }

    API.applyMe.apply($scope)
    var route = Storage.getRoute(userRoute.route)
    var filters = {regiao: $EQ(route.title)}
    if (userRoute.categories.length > 0)
        filters['term:area'] = $IN(userRoute.categories)
    API.find(filters).then(function (shops) {
        shops = Util.sort_by_key(shops, 'name');
        UserRoutes.storeShops($stateParams.userRouteId, shops);
        $scope.shops = shops;
    });

})
   
.controller('bookmarksCtrl', function($scope, Storage) {
    $scope.shops = Storage.listBookmarks();
    $scope.removeBookmark = function(shop) {
        Storage.removeBookmark(shop.id);
    };
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
    $scope.data = {category: []}
    $scope.filters = [
        { index: 0,
          verbose_order: 'primeiro',
        },
    ]
    var orders = [ 'primeiro', 'segundo', 'terceiro', 'quarto', 'quinto', 
                   'sexto', 'sétimo', 'oitavo', 'nono', 'décimo' ]
    $scope.addFilter = function() {
        if ($scope.filters.length >= orders.length)
            return
        $scope.filters.push({ index: $scope.filters.length,
                              verbose_order: orders[$scope.filters.length]})
    }
    $scope.createUserRoute = function() {
        $scope.userRouteId = UserRoutes.create($stateParams.route, $scope.data.category)
    };
})
 
