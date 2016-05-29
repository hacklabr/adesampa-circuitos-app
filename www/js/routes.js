angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.map', {
    url: '/map',
    views: {
      'tab4': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.routes'
      2) Using $state.go programatically:
        $state.go('tabsController.routes');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tabs/tab1/routes
      /tabs/tab4/routes
      /tabs/tab2/routes
      /tabs/tab5/routes
  */
  .state('tabsController.routes', {
    url: '/routes',
    views: {
      'tab1': {
        templateUrl: 'templates/routes.html',
        controller: 'routesCtrl'
      },
      'tab4': {
        templateUrl: 'templates/routes.html',
        controller: 'routesCtrl'
      },
      'tab2': {
        templateUrl: 'templates/routes.html',
        controller: 'routesCtrl'
      },
      'tab5': {
        templateUrl: 'templates/routes.html',
        controller: 'routesCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('faqs', {
    url: '/faq',
    templateUrl: 'templates/faqs.html',
    controller: 'faqsCtrl'
  })

  .state('shopkeeper', {
    url: '/shopkeeper',
    templateUrl: 'templates/shopkeeper.html',
    controller: 'shopkeeperCtrl'
  })

  .state('tabsController.routesList', {
    url: '/routeslist',
    views: {
      'tab5': {
        templateUrl: 'templates/routesList.html',
        controller: 'routesListCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.shopsList'
      2) Using $state.go programatically:
        $state.go('tabsController.shopsList');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tabs/tab1/shopslist
      /tabs/tab4/shopslist
      /tabs/tab2/shopslist
      /tabs/tab5/shopslist
  */
  .state('tabsController.shopsList', {
    url: '/shopslist/:userRouteId',
    views: {
      'tab1': {
        templateUrl: 'templates/shopsList.html',
        controller: 'shopsListCtrl'
      },
      'tab4': {
        templateUrl: 'templates/shopsList.html',
        controller: 'shopsListCtrl'
      },
      'tab2': {
        templateUrl: 'templates/shopsList.html',
        controller: 'shopsListCtrl'
      },
      'tab5': {
        templateUrl: 'templates/shopsList.html',
        controller: 'shopsListCtrl'
      }
    }
  })

  .state('tabsController.bookmarks', {
    url: '/bookmarks',
    views: {
      'tab2': {
        templateUrl: 'templates/bookmarks.html',
        controller: 'bookmarksCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.shopSingle'
      2) Using $state.go programatically:
        $state.go('tabsController.shopSingle');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tabs/tab1/shopsingle
      /tabs/tab4/shopsingle
      /tabs/tab2/shopsingle
      /tabs/tab5/shopsingle
  */
  .state('tabsController.shopSingle', {
    url: '/shopsingle/:shop',
    views: {
      'tab1': {
        templateUrl: 'templates/shopSingle.html',
        controller: 'shopSingleCtrl'
      },
      'tab4': {
        templateUrl: 'templates/shopSingle.html',
        controller: 'shopSingleCtrl'
      },
      'tab2': {
        templateUrl: 'templates/shopSingle.html',
        controller: 'shopSingleCtrl'
      },
      'tab5': {
        templateUrl: 'templates/shopSingle.html',
        controller: 'shopSingleCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.routeSingle'
      2) Using $state.go programatically:
        $state.go('tabsController.routeSingle');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /tabs/tab1/routesingle
      /tabs/tab4/routesingle
      /tabs/tab2/routesingle
      /tabs/tab5/routesingle
  */
  .state('tabsController.routeSingle', {
    url: '/routesingle/:route',
    views: {
      'tab1': {
        templateUrl: 'templates/routeSingle.html',
        controller: 'routeSingleCtrl'
      },
      'tab4': {
        templateUrl: 'templates/routeSingle.html',
        controller: 'routeSingleCtrl'
      },
      'tab2': {
        templateUrl: 'templates/routeSingle.html',
        controller: 'routeSingleCtrl'
      },
      'tab5': {
        templateUrl: 'templates/routeSingle.html',
        controller: 'routeSingleCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/tabs/home')

  

});
