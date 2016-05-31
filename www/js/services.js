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

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

