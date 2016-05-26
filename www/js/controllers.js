var ROUTES = [
        { name: 'bras',
          title: 'Brás',
          headline: 'Moda para todos os gostos e bolsos',
          description: 'No famoso bairro do Brás você encontre as melhores lojas de moda e produtos de qualidade com preços especiais.',
        },
        { name: 'bom-retiro',
          title: 'Bom Retiro',
          headline: 'O destino de quem procura roupas a bom preço',
          description: 'O bairro Bom Retiro abriga as mais variadas e excelentes lojas no setor de moda e vestuário da cidade de São Paulo. Conheça!',
        },
        { name: 'santa-ifigenia',
          title: 'Santa Ifigênia',
          headline: 'O maior oferta de eletrônicos do país',
          description: 'O bairro é destino conhecido pela grande quantidade de lojas especializadas em eletrônicos com o menor preço do mercado.',
        },
        { name: 'vinte-e-cinco',
          title: '25 de Março',
          headline: 'Aqui você encontra de tudo um pouco',
          description: 'O bairro é considerado o maior centro comercial da América Latina. O mais movimentado e diversificado centro de compras varejista e atacadista.',
        },
    ]

var ROUTES_INDEX = {}
for (var i=0; i<ROUTES.length; i++) {
    ROUTES_INDEX[ROUTES[i].name] = ROUTES[i]
}

angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('mapCtrl', function($scope) {

})
   
.controller('routesCtrl', function($scope) {
    $scope.routes = ROUTES;
})
         
.controller('faqsCtrl', function($scope) {

})
   
.controller('shopkeeperCtrl', function($scope) {

})
   
.controller('routesListCtrl', function($scope) {
})
   
.controller('shopsListCtrl', function($scope) {

})
   
.controller('bookmarksCtrl', function($scope) {

})
   
.controller('shopSingleCtrl', function($scope) {

})
   
.controller('routeSingleCtrl', function($scope, $stateParams) {
    $scope.route = ROUTES_INDEX[$stateParams.route];
})
 
