angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('mapCtrl', function($scope, $compile, $templateRequest, API) {
    var map = L.map('mapid').setView([-23.5498,-46.6330], 14);
    L.tileLayer( 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        attribution: '&copy; Colaboradores do <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> ',
        subdomains: ['otile1','otile2','otile3','otile4']
    }).addTo( map );

    API.applyMe.apply($scope);

    $templateRequest("templates/parts/map-popup.html")
    $templateRequest("templates/parts/map-loading.html")

    var createMarker = function(lat, lng, shopId) {
        var marker = L.marker([lat, lng]);
        $templateRequest("templates/parts/map-loading.html").then(function(html) {
            marker.bindPopup(html);
        });
        marker.loaded = false;
        marker.on('click', function(e) {
            if (marker.loaded)
                return;
            var popup = e.target.getPopup();
            API.findOne({id: $EQ(shopId)}).then(function (shop) {
                $templateRequest("templates/parts/map-popup.html").then(function(html){
                    var scope = $scope.$new();
                    scope.shop = shop;
                    var linkFunction = $compile(angular.element(html));
                    var content = linkFunction(scope)[0];
                    popup.setContent(content);
                    marker.loaded = true;
                    popup.update();
                });
            });
        });
        return marker;
    };

    API.find().then(function (shops) {
        $scope.shops = shops;
        var markers = L.markerClusterGroup();
        var i, l;
        for (i=0; i<shops.length; i++) {
            l = shops[i].location;
            markers.addLayer(createMarker(l.latitude, l.longitude, shops[i].id));
        }
        map.addLayer(markers);
    });

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
 
