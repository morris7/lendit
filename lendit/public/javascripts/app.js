/**
 * Created by sam morris on 01/12/2015.
 */
var app = angular.module('app', ['ngRoute','ngFileUpload','ui.bootstrap']).directive('gridItem', function () {
    return {
        restrict: 'EA',
        templateUrl:'../directives/grid-item.html'
    };
}).directive('itemImage', function(){
    return {
        restrict: 'EA',
        templateUrl:'../directives/item-image.html'
    };
}).directive("ngUsername", function () {
    return {

        restrict: 'AE',
        template:'{{username}}'
    };

});

app.config(function($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: 'partials/home.html', controller: 'homeController' })
        .when('/lend', { templateUrl: 'partials/lend.html', controller: 'lendController' })
        .when('/borrow', { templateUrl: 'partials/borrow.html', controller: 'borrowController' })
        .when('/borrow/:id', { templateUrl: 'partials/borrow-item.html', controller: 'borrowItemController' })
        .when('/login', { templateUrl: 'partials/login.html', controller: 'loginController'})
        .when('/logout', {controller: 'logoutController'})
        .when('/register', { templateUrl: 'partials/register    .html', controller: 'registerController'})
        .when('/lend-success', { templateUrl: 'partials/lend-success.html'})
        .otherwise({redirectTo:'/'});
});

app.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (AuthService.isLoggedIn() === false) {
            //$location.path('/login');
        }
    });
});




