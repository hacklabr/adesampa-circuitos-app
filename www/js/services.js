angular.module('app.services', [])

.service('API', ['mapas.service.space', function(spaceApi) {
    var api = spaceApi('http://mapa.desenvolvimentolocal.hacklab.com.br/');
    this.applyMe = api.util.applyMe
    this.find = api.find
    this.findOne = api.findOne
    
}])

.service('Util', function() {
    this.index_obj = function(obj_list, key) {
        var indexed_obj = {};
        obj_list.forEach(function(obj) {
            indexed_obj[obj.id] = obj;
        });
        return indexed_obj;
    }
})

.service('Storage', function($localStorage, Util) {
    if (!$localStorage.userRoutes) {
        $localStorage.userRoutes = [];
    }
    
    var routeIndex = Util.index_obj(ROUTES)
    var userRouteIndex = Util.index_obj($localStorage.userRoutes)

    this.listRoutes = function() {
        return ROUTES;
    }
    this.getRoute = function(routeId) {
        return routeIndex[routeId];
    }

    this.storeUserRoute = function(userRoute) {
        userRoute.id = Math.max.apply(Math, ($localStorage.userRoutes.map(function(obj) { return obj.id || 0}))) + 1;
        $localStorage.userRoutes.push(userRoute)
        userRouteIndex[userRoute.id] = userRoute;
        return userRoute.id;
    }
    this.getUserRoute = function(routeId) {
        return userRouteIndex[routeId];
    }
    this.deleteUserRoute = function(routeId) {
        for (var i=0; i<$localStorage.userRoutes.length; i++) {
            if ($localStorage.userRoutes[i].id == routeId) {
                delete userRouteIndex[routeId];
                return $localStorage.userRoutes.splice(i, 1)[0];
            }
        }
    }
    this.listUserRoutes = function() {
        return $localStorage.userRoutes;
    }
})


.service('UserRoutes', ['Storage', function(Storage) {
    var self = this;
    this.create = function(route) {
        var userRoute = {
            'route': route,
            'created': new Date(),
            //'shops': shops,
        }
        Storage.storeUserRoute(userRoute)
        return userRoute.id
    }
    this.list = Storage.listUserRoutes;
    this.get = Storage.getUserRoute;
    this.storeShops = function(routeId, shops) {
        var route = self.get(routeId);
        route.shops = shops;
    }
        
}])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

