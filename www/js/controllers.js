var ROUTES = [
        { name: 'bras',
          title: 'Brás',
          headline: 'Moda para todos os gostos e bolsos',
          description: 'No famoso bairro do Brás você encontre as melhores lojas de moda e produtos de qualidade com preços especiais.',
          categories: [ 'Alimentos',
                        'Artigos para lojas',
                        'Aviamentos',
                        'Bijuterias',
                        'Malas e Bolsas',
                        'Cama, mesa e banho',
                        'Couro e Assessorios',
                        'Embalagens',
                        'Enxoval',
                        'Expositores, manequins',
                        'Madeiras',
                        'Moda Esportiva',
                        'Moda Evangélica',
                        'Moda Feminina',
                        'Moda Festa',
                        'Moda GG',
                        'Moda Infantil',
                        'Moda Íntima',
                        'Moda Jeans',
                        'Moda Jovem',
                        'Moda Masculina',
                        'Moda Praia',
                        'Noivas',
                        'Papelaria',
                        'Sacaria',
                        'Serviços',
                        'Surfwear',
                        'Tecidos e Retalhos',
                      ]

        },
        { name: 'bom-retiro',
          title: 'Bom Retiro',
          headline: 'O destino de quem procura roupas a bom preço',
          description: 'O bairro Bom Retiro abriga as mais variadas e excelentes lojas no setor de moda e vestuário da cidade de São Paulo. Conheça!',
          categories: ['Alarmes e CFTV',
                       'Assistencia Técnica',
                       'Audio e Video',
                       'Cabos',
                       'Câmeras Digitais',
                       'Cartuchos',
                       'Celulares',
                       'Componentes',
                       'Elétrica',
                       'Eletrônicos',
                       'Ferramentas',
                       'Games',
                       'Iluminação',
                       'Informática',
                       'Instrumentos musicais',
                       'Mídias Cds e Dvds',
                       'Notebooks',
                       'Segurança',
                       'Som Automotivo',
                       'Telefonia',
                      ]
        },
        { name: 'santa-ifigenia',
          title: 'Santa Ifigênia',
          headline: 'O maior oferta de eletrônicos do país',
          description: 'O bairro é destino conhecido pela grande quantidade de lojas especializadas em eletrônicos com o menor preço do mercado.',
          categories: [ 'Aviamentos',
                        'Bijuterias',
                        'Calçados',
                        'Confecções',
                        'Embalagens',
                        'Jeans',
                        'Linhas e Fios',
                        'Malas e Bolsas',
                        'Maquinas e Assistencia',
                        'Moda Feminina',
                        'Moda Festa',
                        'Moda GG',
                        'Moda Infantil',
                        'Tecido e Malharia',
                        'Moda Social Feminina',
                        'Moda Masculina',
                        'Moda Praia',
                      ]

        },
        { name: 'vinte-e-cinco',
          title: '25 de Março',
          headline: 'Aqui você encontra de tudo um pouco',
          description: 'O bairro é considerado o maior centro comercial da América Latina. O mais movimentado e diversificado centro de compras varejista e atacadista.',
          categories: [ 'Alimentos',
                        'Armarinhos',
                        'Artesanato',
                        'Artigos de Época',
                        'Artigos Festa',
                        'Aviamentos',
                        'Bijuterias',
                        'Brindes',
                        'Brinquedos',
                        'Cama, mesa e banho',
                        'Decoração',
                        'Embalagens',
                        'Importados',
                        'Malas e Bolsas',
                        'Moda',
                        'Fantasia',
                      ]
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
   
.controller('shopsListCtrl', [ '$scope', '$stateParams', 'mapas.service.space', function($scope, $stateParams, spaceApi) {
    var api = spaceApi('http://mapa.desenvolvimentolocal.hacklab.com.br/');
    var route = ROUTES_INDEX[$stateParams.route]
    api.util.applyMe.apply($scope);
    api.find({regiao: $EQ(route.title)}).then(function (shops) {
        $scope.shops = shops;
    });
}])
   
.controller('bookmarksCtrl', function($scope) {

})
   
.controller('shopSingleCtrl', [ '$scope', '$stateParams', 'mapas.service.space', function($scope, $stateParams, spaceApi) {
    var api = spaceApi('http://mapa.desenvolvimentolocal.hacklab.com.br/');
    api.util.applyMe.apply($scope);
    api.findOne({id: $EQ($stateParams.shop)}).then(function (shop) {
        // TODO: remover isso depois de arrumar os dados no servidor
        if (shop.emailPublico.match(/^E-mail: /)) {
            shop.emailPublico = shop.emailPublico.replace(/^E-mail: /, '');
        }
        if (shop.telefonePublico) {
            shop.phoneHref = shop.telefonePublico.replace(/\D/g, '').replace(/^/, '+55');
        }
        $scope.shop = shop;
        console.log(shop);
    });
}])
   
.controller('routeSingleCtrl', function($scope, $stateParams) {
    $scope.route = ROUTES_INDEX[$stateParams.route];
})
 
