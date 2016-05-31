angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})

.controller('mapCtrl', function($scope, API, Util, Map) {
    Map.init('map');
    API.applyMe.apply($scope);

    var detailProvider = function(shopId, callback) {
        API.findOne({id: $EQ(shopId)}).then(callback);
    };

    var loadShops = function(categories) {
        var filters = {};
        if (categories && categories.length > 0)
            filters['term:area'] = $IN(categories);
        API.find(filters).then(function (shops) {
            Map.load(shops, detailProvider);
        });
    };

    loadShops();

    var categories = Util.merge_lists(ROUTES.map(function(obj) { return obj.categories }));
    $scope.categories = categories;

    $scope.data = {
        modal: false,
        category: []
    };
    $scope.filters = [ 0 ];

    $scope.addFilter = function() {
        $scope.filters.push($scope.filters.length);
    }
    $scope.filterMap = function() {
        loadShops($scope.data.category);
        $scope.data.modal = false;
    }

})
   
.controller('routesCtrl', function($scope, Storage) {
    $scope.routes = Storage.listRoutes();
})
         
.controller('faqsCtrl', function($scope) {

})
   
.controller('shopkeeperCtrl', function($scope) {

})
   
.controller('routesListCtrl', function($scope, Storage, UserRoutes) {
    var userRoutes = JSON.parse(JSON.stringify(UserRoutes.list()));
    for (var i=0; i<userRoutes.length; i++) {
        userRoutes[i].route = Storage.getRoute(userRoutes[i].route);
    }
    $scope.userRoutes = userRoutes;
    $scope.removeRoute = function(route) {
        UserRoutes.remove(route.id);
        for (var i=0; i<userRoutes.length; i++) {
            if (userRoutes[i].id == route.id) {
                userRoutes.splice(i, 1);
                return;
            }
        }
    };
})
   
.controller('shopsListCtrl', function(API, $scope, $stateParams, Storage, UserRoutes, Util, Map, $state) {
    var mapid = $state.current.name.split(/\./)[1];
    $scope.mapid = mapid;

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

    $scope.selectList = function() {
        $scope.isList = true;
        $scope.isMap = false;
    }
    $scope.selectMap = function() {
        $scope.isList = false;
        $scope.isMap = true;
        Map.init(mapid);
        Map.load($scope.shops);
    }

    $scope.selectList();

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
        if ($scope.isMap)
            Map.load($scope.shops);
    });

})
   
.controller('bookmarksCtrl', function($scope, Storage, Map) {
    var shops = Storage.listBookmarks();
    $scope.shops = shops;
    $scope.selectList = function() {
        $scope.isList = true;
        $scope.isMap = false;
    }
    $scope.selectMap = function() {
        $scope.isList = false;
        $scope.isMap = true;
        Map.init('bookmarks');
        Map.load(shops);
    }
    $scope.removeBookmark = function(shop) {
        Storage.removeBookmark(shop.id);
    };
    $scope.selectList();
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
 
.controller('GalleryCtrl', function ($scope, Lightbox) {

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

});