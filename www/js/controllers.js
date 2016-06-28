var LOADING = {
    template: 'Carregando...',
    hideOnStateChange: true,
}

angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('mapCtrl', function($scope, API, Util, Map, $localStorage, $ionicLoading) {

    var headerHeight = document.getElementsByTagName('ion-header-bar')[0].offsetHeight;
    var menuHeight = document.getElementsByClassName('tab-nav')[0].offsetHeight;
    document.getElementById('map-map').style.height = (window.innerHeight - menuHeight - headerHeight) + "px";

    Map.selectDataset('map');
    API.applyMe.apply($scope);

    var loadShops = function(categories) {
        var filters = {};
        if (categories && categories.length > 0)
            filters['term:area'] = $IN(categories);
        if (false && $localStorage.cache) {
            // for development purposes
            Map.load('map', $localStorage.cache);
        } else {
            $ionicLoading.show(LOADING);
            API.find(filters).then(function (shops) {
                $localStorage.cache = shops;
                $ionicLoading.hide();
                Map.load('map', shops);
                Map.initView('map');
            });
        }
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
    var userRoutes = UserRoutes.list();
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
   
.controller('shopsListCtrl', function(API, $scope, $stateParams, Storage, UserRoutes, Util, Map, $state, $ionicHistory, $ionicLoading) {
    var mapid = $state.current.name.split(/\./)[1];
    var tab = $state.current.name.split(/_/)[1];
    $scope.mapid = mapid;
    datasets = {
        tab1: 'home',
        tab5: 'routes',
    }
    var dataset = datasets[tab];
    var target = dataset;
    $scope.dataset = dataset;
    $scope.target = target;
    $scope.tab = tab;

    var userRoute = UserRoutes.get($stateParams.userRouteId);
    $scope.route = Storage.getRoute(userRoute.route.id);
    $scope.created = userRoute.created;
    $scope.categories = userRoute.categories;
    $scope.data = { userRouteTitle: userRoute.title };

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

    var initialized = false;
    $scope.selectMap = function() {
        var topHeight = document.getElementsByTagName('ion-header-bar')[0].offsetHeight;
        topHeight += document.getElementsByClassName('tab-nav')[0].offsetHeight;
        topHeight += document.querySelector('ion-nav-view[name='+tab+'] ion-list.page-header div.list').offsetHeight;
        topHeight += document.querySelector('.button-bar').offsetHeight;
        document.getElementById('map-'+mapid).style.height = (window.innerHeight - topHeight) + "px";

        $scope.isList = false;
        $scope.isMap = true;

        Map.update(target);
        if (!initialized) {
            Map.initView(target, userRoute.route);
            initialized = true;
        }
    }
    $scope.back = function() {
        $ionicHistory.goBack();
    }

    $scope.selectList();

    if ($stateParams.userRouteId == 'new') {
        $scope.editing = true;
        $scope.newRoute = true;
    }

    $scope.saveRoute = function() {
        $scope.editing = false;
        UserRoutes.save($stateParams.userRouteId, $scope.data.userRouteTitle);
        $scope.newRoute = false;
    }
    $scope.cancelSave = function() {
        $scope.editing = false;
        $scope.newRoute = false;
        $scope.data.userRouteTitle = userRoute.title;
    }
    $scope.editRoute = function() {
        $scope.editing = true;
    }

    if (userRoute.shops) {
        $scope.shops = userRoute.shops;
        Map.load(dataset, $scope.shops);
        return;
    }

    API.applyMe.apply($scope)
    var filters = {regiao: $EQ(userRoute.route.title)}
    if (userRoute.categories.length > 0)
        filters['term:area'] = $IN(userRoute.categories)
    $ionicLoading.show(LOADING);
    API.find(filters).then(function (shops) {
        shops = Util.sort_by_key(shops, 'name');
        UserRoutes.storeShops($stateParams.userRouteId, shops);
        $scope.shops = shops;
        $ionicLoading.hide();
        Map.load(dataset, $scope.shops);
    });
})
   
.controller('bookmarksCtrl', function($scope, Storage, Map) {
    var shops = Storage.listBookmarks();
    $scope.shops = shops;
    Map.load('bookmarks', shops);
    Map.initView('map');
    $scope.selectList = function() {
        $scope.isList = true;
        $scope.isMap = false;
    }
    $scope.selectMap = function() {
        var topHeight = document.getElementsByTagName('ion-header-bar')[0].offsetHeight;
        topHeight += document.getElementsByClassName('tab-nav')[0].offsetHeight;
        topHeight += document.querySelector('ion-nav-view[name=tab2] ion-list.page-header div.list').offsetHeight;
        topHeight += document.querySelector('.button-bar').offsetHeight;
        document.getElementById('map-bookmarks').style.height = (window.innerHeight - topHeight) + "px";

        $scope.isList = false;
        $scope.isMap = true;
        Map.update('bookmarks');
    }
    $scope.removeBookmark = function(shop) {
        Storage.removeBookmark(shop.id);
    };

    $scope.selectList();
})

.controller('shopSingleCtrl', function(API, $scope, $stateParams, $ionicHistory, $state, Map, $ionicLoading) {
    API.applyMe.apply($scope);
    $ionicLoading.show(LOADING);
    API.findOne({id: $EQ($stateParams.shop)}).then(function (shop) {
        // TODO: remover isso depois de arrumar os dados no servidor
        if (shop.emailPublico && shop.emailPublico.match(/^E-mail: /)) {
            shop.emailPublico = shop.emailPublico.replace(/^E-mail: /, '');
        }
        if (shop.telefonePublico) {
            shop.phoneHref = shop.telefonePublico.replace(/\D/g, '').replace(/^/, '+55');
        }
        $scope.shop = shop;
        $ionicLoading.hide();
        Map.focus(shop);
    });

    datasets = {
        tab1: 'home',
        tab2: 'bookmarks',
        tab4: 'map',
        tab5: 'routes',
    }
    var tab = $state.current.name.split(/_/)[1];
    var dataset = datasets[tab];
    var target = dataset + '-shop';
    $scope.dataset = dataset;
    $scope.target = target;

    Map.update(target);

    $scope.back = function() {
        $ionicHistory.goBack();
    }
})

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
        $scope.userRouteId = UserRoutes.create($stateParams.route, $scope.data.category);
    };
})
 
.controller('GalleryCtrl', function ($scope, Lightbox) {

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

});
