angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.inCio', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/inCio.html',
        controller: 'inCioCtrl'
      }
    }
  })

  .state('tabsController.mapa', {
    url: '/map',
    views: {
      'tab4': {
        templateUrl: 'templates/mapa.html',
        controller: 'mapaCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.circuitos'
      2) Using $state.go programatically:
        $state.go('tabsController.circuitos');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/routes
      /page1/tab4/routes
      /page1/tab2/routes
      /page1/tab5/routes
  */
  .state('tabsController.circuitos', {
    url: '/routes',
    views: {
      'tab1': {
        templateUrl: 'templates/circuitos.html',
        controller: 'circuitosCtrl'
      },
      'tab4': {
        templateUrl: 'templates/circuitos.html',
        controller: 'circuitosCtrl'
      },
      'tab2': {
        templateUrl: 'templates/circuitos.html',
        controller: 'circuitosCtrl'
      },
      'tab5': {
        templateUrl: 'templates/circuitos.html',
        controller: 'circuitosCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('fAQs', {
    url: '/faq',
    templateUrl: 'templates/fAQs.html',
    controller: 'fAQsCtrl'
  })

  .state('souLojista', {
    url: '/shopkeeper',
    templateUrl: 'templates/souLojista.html',
    controller: 'souLojistaCtrl'
  })

  .state('tabsController.listaDeCircuitos', {
    url: '/routes-list',
    views: {
      'tab5': {
        templateUrl: 'templates/listaDeCircuitos.html',
        controller: 'listaDeCircuitosCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.lojas'
      2) Using $state.go programatically:
        $state.go('tabsController.lojas');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/shops-list
      /page1/tab4/shops-list
      /page1/tab2/shops-list
      /page1/tab5/shops-list
  */
  .state('tabsController.lojas', {
    url: '/shops-list',
    views: {
      'tab1': {
        templateUrl: 'templates/lojas.html',
        controller: 'lojasCtrl'
      },
      'tab4': {
        templateUrl: 'templates/lojas.html',
        controller: 'lojasCtrl'
      },
      'tab2': {
        templateUrl: 'templates/lojas.html',
        controller: 'lojasCtrl'
      },
      'tab5': {
        templateUrl: 'templates/lojas.html',
        controller: 'lojasCtrl'
      }
    }
  })

  .state('tabsController.favoritos', {
    url: '/bookmarks',
    views: {
      'tab2': {
        templateUrl: 'templates/favoritos.html',
        controller: 'favoritosCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.loja'
      2) Using $state.go programatically:
        $state.go('tabsController.loja');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/shop-single
      /page1/tab4/shop-single
      /page1/tab2/shop-single
      /page1/tab5/shop-single
  */
  .state('tabsController.loja', {
    url: '/shop-single',
    views: {
      'tab1': {
        templateUrl: 'templates/loja.html',
        controller: 'lojaCtrl'
      },
      'tab4': {
        templateUrl: 'templates/loja.html',
        controller: 'lojaCtrl'
      },
      'tab2': {
        templateUrl: 'templates/loja.html',
        controller: 'lojaCtrl'
      },
      'tab5': {
        templateUrl: 'templates/loja.html',
        controller: 'lojaCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.circuito'
      2) Using $state.go programatically:
        $state.go('tabsController.circuito');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/route-single
      /page1/tab4/route-single
      /page1/tab2/route-single
      /page1/tab5/route-single
  */
  .state('tabsController.circuito', {
    url: '/route-single',
    views: {
      'tab1': {
        templateUrl: 'templates/circuito.html',
        controller: 'circuitoCtrl'
      },
      'tab4': {
        templateUrl: 'templates/circuito.html',
        controller: 'circuitoCtrl'
      },
      'tab2': {
        templateUrl: 'templates/circuito.html',
        controller: 'circuitoCtrl'
      },
      'tab5': {
        templateUrl: 'templates/circuito.html',
        controller: 'circuitoCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/home')

  

});