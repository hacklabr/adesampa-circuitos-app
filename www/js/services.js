angular.module('app.services', [])

.service('API', ['mapas.service.space', function(spaceApi) {
    var api = spaceApi('http://mapa.desenvolvimentolocal.hacklab.com.br/');
    this.applyMe = api.util.applyMe
    this.find = api.find
    this.findOne = api.findOne
    
}])

.service('Util', function() {
    var self = this;
    this.index_obj = function(obj_list, key) {
        var indexed_obj = {};
        obj_list.forEach(function(obj) {
            indexed_obj[obj.id] = obj;
        });
        return indexed_obj;
    }
    this.next_id = function(obj_list) {
        if (obj_list.length == 0) {
            return 1;
        }
        return Math.max.apply(Math, (obj_list.map(function(obj) { return obj.id || 0}))) + 1;
    }
    this.find_obj = function(obj_list, obj_id) {
        return obj_list.map(function(obj) { return obj.id }).indexOf(obj_id)
    }
    this.unique_sorted = function(list) {
        var sorted = list.sort();
        while (sorted[0] == '')
            sorted.splice(0, 1)
        for (var i=1; i<sorted.length; ) {
            if (sorted[i] == sorted[i-1] || sorted[i] == '')
                sorted.splice(i, 1);
            else 
                i++;
        }
        return sorted;
    }
    this.sort_by_key = function(list, key) {
        return list.sort(function(a, b) {
            if (a[key] > b[key])
                return 1;
            if (a[key] < b[key])
                return -1;
            return 0
        });
    }
    this.merge_lists = function(lists) {
        var big = []
        for (var i=0; i<lists.length; i++) {
            for (var j=0; j<lists[i].length; j++) {
                big.push(lists[i][j]);
            }
        }
        return self.unique_sorted(big);
    }
})

.service('Storage', function($localStorage, Util) {
    if (!$localStorage.userRoutes) {
        $localStorage.userRoutes = [];
    }
    if (!$localStorage.bookmarks) {
        $localStorage.bookmarks = [];
    }
    
    var routeIndex = Util.index_obj(ROUTES)
    var userRouteIndex = Util.index_obj($localStorage.userRoutes)
    var bookmarkIndex = Util.index_obj($localStorage.bookmarks)

    this.listRoutes = function() {
        return ROUTES;
    }
    this.getRoute = function(routeId) {
        return routeIndex[routeId];
    }

    this.storeUserRoute = function(userRoute) {
        userRoute.id = Util.next_id($localStorage.userRoutes);
        $localStorage.userRoutes.unshift(userRoute)
        userRouteIndex[userRoute.id] = userRoute;
        return userRoute.id;
    }
    this.getUserRoute = function(routeId) {
        return userRouteIndex[routeId];
    }
    this.removeUserRoute = function(routeId) {
        if (!userRouteIndex[routeId])
            return;
        delete userRouteIndex[routeId];
        var i = Util.find_obj($localStorage.userRoutes, routeId);
        $localStorage.userRoutes.splice(i, 1);
    }
    this.listUserRoutes = function() {
        return $localStorage.userRoutes;
    }

    this.listBookmarks = function() {
        return $localStorage.bookmarks;
    }
    this.storeBookmark = function(shop) {
        if (bookmarkIndex[shop.id]) {
            var i = Util.find_obj($localStorage.bookmarks, shop.id);
            $localStorage.bookmarks.splice(i, 1);
        }
        $localStorage.bookmarks.unshift(shop);
        bookmarkIndex[shop.id] = shop;
    }
    this.removeBookmark = function(shopId) {
        if (!bookmarkIndex[shopId])
            return;
        delete bookmarkIndex[shopId];
        var i = Util.find_obj($localStorage.bookmarks, shopId);
        $localStorage.bookmarks.splice(i, 1);
    }
    this.isBookmark = function(shopId) {
        return !!bookmarkIndex[shopId];
    }
})


.service('UserRoutes', function(Storage, Util) {
    var self = this;
    this.create = function(route, categories) {
        categories = Util.unique_sorted(categories)
        var userRoute = {
            'route': route,
            'created': new Date(),
            'categories': categories,
            //'shops': shops,
        }
        Storage.storeUserRoute(userRoute)
        return userRoute.id
    }
    this.list = Storage.listUserRoutes;
    this.get = Storage.getUserRoute;
    this.remove = Storage.removeUserRoute;
    this.storeShops = function(routeId, shops) {
        var route = self.get(routeId);
        route.shops = shops;
    }
        
})

.service('Map', function($compile, $templateRequest, $rootScope) {
    var self = this;

    $templateRequest("templates/parts/map-popup.html");
    $templateRequest("templates/parts/map-loading.html");

    targets = {};

    this.setTarget = function(target) {
        if (self.target == target)
            return
        var map = document.getElementById('mapid');
        var element = document.getElementById('map-'+target);
        element.appendChild(map);
        if (!element.style.height)
            element.style.height = element.clientHeight + "px";
        map.style.height = element.style.height;
        map.style.width = element.style.width;
        if (self.target)
            self.map.removeLayer(targets[self.target].cluster)
        self.map.addLayer(targets[target].cluster);
        self.target = target;
    }

    this.init = function(target) {
        if (!self.created)
            self.create();
        if (!targets[target]) {
            self.createTarget(target);
            self.setTarget(target);
        } else {
            self.setTarget(target);
            self.clean(target);
        }
    };

    this.create = function() {
        self.map = L.map('mapid', {
            zoomControl: false,
        });
        self.map.setView([-23.5498,-46.6330], 14);
        L.mapbox.accessToken = 'pk.eyJ1IjoiYWRlc2FtcGEiLCJhIjoiY2lvdzFuazNnMDFkOHU5bTQ2cHB6YmxlaiJ9.Ih9YSBt4gG8JswMY2dy0dw';
        self.map.addLayer(L.mapbox.tileLayer('mapbox.streets'));

        self.created = true;
    };

    this.createTarget = function(target) {
        targets[target] = {
            markers: [],
            cluster: L.markerClusterGroup(),
        }
    }

    this.clean = function(target) {
        if (!target)
            target = self.target;
        var markers = targets[target].markers;
        var cluster = targets[target].cluster;
        while (markers.length > 0) {
            cluster.removeLayer(markers.pop());
        }
    };

    this.addMarker = function(lat, lng, shopId, detailProvider) {
        var marker = L.marker([lat, lng]);
        $templateRequest("templates/parts/map-loading.html").then(function(html) {
            marker.bindPopup(html);
        });
        marker.loaded = false;
        marker.on('click', function(e) {
            if (marker.loaded)
                return;
            var popup = e.target.getPopup();
            detailProvider(shopId, function (shop) {
                $templateRequest("templates/parts/map-popup.html").then(function(html){
                    var scope = $rootScope.$new();
                    scope.shop = shop;
                    var linkFunction = $compile(angular.element(html));
                    var content = linkFunction(scope)[0];
                    popup.setContent(content);
                    marker.loaded = true;
                    popup.update();
                });
            });
        });
        targets[self.target].cluster.addLayer(marker);
        targets[self.target].markers.push(marker);
    };

    this.load = function(shops, detailProvider) {
        self.clean()
        var providerFactory = function(shop) {
            return function(shopId, callback) { callback(shop) };
        }
        var i, l, marker, provider;
        for (i=0; i<shops.length; i++) {
            l = shops[i].location;
            if (detailProvider)
                provider = detailProvider;
            else
                provider = providerFactory(shops[i]);
            self.addMarker(l.latitude, l.longitude, shops[i].id, provider);
        };
    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var tab = toState.name.split(/\./)[1]
        if (targets[tab]) {
            self.setTarget(tab);
        }
    });
})


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

