/**
 * Created by sam morris on 01/12/2015.
 */
var app = angular.module('app', ['ngRoute','ngFileUpload']).directive('gridItem', function () {
    return {
        restrict: 'EA',
        templateUrl:'../directives/grid-item.html'
    };
}).directive('itemImage', function(){
    return {
        restrict: 'EA',
        templateUrl:'../directives/item-image.html'
    };
});

app.config(function($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: 'partials/home.html', controller: 'homeController' })
        .when('/lend', { templateUrl: 'partials/lend.html', controller: 'lendController' })
        .when('/borrow', { templateUrl: 'partials/borrow.html', controller: 'borrowController' })
        .when('/borrow/:id', { templateUrl: 'partials/borrow-item.html', controller: 'borrowItemController' })
        .otherwise({redirectTo:'/'});
});




