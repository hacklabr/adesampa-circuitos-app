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

  .state('inCioV2', {
    url: '/home2',
    templateUrl: 'templates/inCioV2.html',
    controller: 'inCioV2Ctrl'
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
        ui-sref='tabsController.circuitos'
      2) Using $state.go programatically:
        $state.go('tabsController.circuitos');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/routes
      /page1/tab5/routes
  */
  .state('tabsController.circuitos', {
    url: '/routes',
    views: {
      'tab1': {
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

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.circuitos2'
      2) Using $state.go programatically:
        $state.go('tabsController.circuitos2');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/list-routes
      /page1/tab5/list-routes
  */
  .state('tabsController.circuitos2', {
    url: '/list-routes',
    views: {
      'tab1': {
        templateUrl: 'templates/circuitos2.html',
        controller: 'circuitos2Ctrl'
      },
      'tab5': {
        templateUrl: 'templates/circuitos2.html',
        controller: 'circuitos2Ctrl'
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
      /page1/tab1/list-shops
      /page1/tab5/list-shops
  */
  .state('tabsController.lojas', {
    url: '/list-shops',
    views: {
      'tab1': {
        templateUrl: 'templates/lojas.html',
        controller: 'lojasCtrl'
      },
      'tab5': {
        templateUrl: 'templates/lojas.html',
        controller: 'lojasCtrl'
      }
    }
  })

  .state('loja', {
    url: '/shop',
    templateUrl: 'templates/loja.html',
    controller: 'lojaCtrl'
  })

$urlRouterProvider.otherwise('/page1/home')

  

});