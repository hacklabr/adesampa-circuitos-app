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
    var self = this;
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

    this.newUserRoute = function(userRoute) {
        userRoute.id = 'new';
        userRouteIndex['new'] = userRoute;
        return 'new';
    }
    this.saveUserRoute = function(id, title) {
        userRoute = userRouteIndex[id];
        userRoute.title = title;
        if (id == 'new')
            self.storeUserRoute(userRoute);
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
            'route': Storage.getRoute(route),
            'created': new Date(),
            'categories': categories,
            //'shops': shops,
        }
        return Storage.newUserRoute(userRoute)
    }
    this.save = Storage.saveUserRoute;
    this.list = Storage.listUserRoutes;
    this.get = Storage.getUserRoute;
    this.remove = Storage.removeUserRoute;
    this.storeShops = function(routeId, shops) {
        var route = self.get(routeId);
        route.shops = shops;
    }
        
})

.service('Map', function($rootScope, $window, $ionicHistory) {
    var self = this;

    var dataSets = {};
    var targets = {};
    var states = {};
    var viewTimeout = null;

    this.rootDOM = null;

    this.setRootDOM = function(element) {
        self.rootDOM = element;
    }

    this.create = function() {
        self.map = L.map(self.rootDOM, {
            zoomControl: false,
            tap: false,
        });
        self.map.setView([-23.5498,-46.6330], 14);
        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; Colaboradores do <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> ',
            subdomains: ['a', 'b', 'c']
        }).addTo( self.map );
        self.created = true;
    };

    this.createDataset = function(dataset) {
        if (!self.created)
            self.create();
        dataSets[dataset] = {
            markers: [],
            cluster: L.markerClusterGroup({
                maxClusterRadius: 45
            }),
        }
    }

    this.selectDataset = function(dataset) {
        if (!dataSets[dataset])
            self.createDataset(dataset);

        if (self.dataset)
            self.map.removeLayer(dataSets[self.dataset].cluster)

        self.dataset = dataset
        self.map.addLayer(dataSets[dataset].cluster);
    }

    this.clean = function(dataset) {
        if (!dataset)
            dataset = self.dataset;
        var markers = dataSets[dataset].markers;
        var cluster = dataSets[dataset].cluster;
        while (markers.length > 0) {
            cluster.removeLayer(markers.pop());
        }
    };

    this.setLinkPath = function(path) {
        self.linkPath = path;
    }

    this.addMarker = function(dataset, lat, lng, shopId) {
        var marker = L.marker([lat, lng]);
        marker.on('mousedown', function(e) {
            if (self.linkPath)
                $window.location.href = self.linkPath + shopId;
        });
        dataSets[dataset].cluster.addLayer(marker);
        dataSets[dataset].markers.push(marker);
    };

    this.load = function(dataset, shops) {
        if (!dataSets[dataset])
            self.createDataset(dataset);
        else
            self.clean(dataset)
        var i, l, marker;
        for (i=0; i<shops.length; i++) {
            l = shops[i].location;
            self.addMarker(dataset, l.latitude, l.longitude, shops[i].id);
        };
    };

    this.createTarget = function(dataset, target, element, linkpath, state) {
        var data = { 
            dataset: dataset,
            target: target,
            element: element,
            linkpath: linkpath,
            state: state,
        }
        targets[target] = data;
        states[state] = data;
        var currentState = $ionicHistory.currentView().stateName;
        if (currentState == state)
            self.update(target);
    }

    this.focus = function(shop) {
        self.clean();
        var l = shop.location
        self.addMarker(self.dataset, l.latitude, l.longitude);
        self.setView([l.latitude, l.longitude], 16);
    }

    this.saveView = function() {
        if (!self.target)
            return;
        var data = targets[self.target];
        data.center = self.map.getCenter();
        data.zoom = self.map.getZoom();
    }

    this.update = function(target) {
        self.saveView();

        var ctx = targets[target];
        if (!ctx)
            return

        self.target = target;
        
        // Set proper context in Map
        self.selectDataset(ctx.dataset);
        self.setLinkPath(ctx.linkpath);
        
        // Append map element to this element
        ctx.element.appendChild(self.rootDOM);
        self.rootDOM.style.height = ctx.element.style.height;
        self.rootDOM.style.width = ctx.element.style.width;
        setTimeout(function() { self.map.invalidateSize() }, 1);
        if (targets[target].zoom)
            self.setView(targets[target].center, targets[target].zoom)
    };

    this.setView = function(center, zoom) {
        if (viewTimeout)
            clearTimeout(viewTimeout);
        viewTimeout = setTimeout(function() {
            viewTimeout = null;
            self.map.setView(center, zoom);
        }, 2);
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (states[toState.name]) {
            self.update(states[toState.name].target);
        }
    });
    
})


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

