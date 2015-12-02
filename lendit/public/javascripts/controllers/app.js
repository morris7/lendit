/**
 * Created by sam morris on 01/12/2015.
 */
var app = angular.module('app', ['ngRoute']);

app.config(function($locationProvider, $routeProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: 'partials/home.html', controller: 'ctrl' })
        .when('/lend', { templateUrl: 'partials/lend.html', controller: 'ctrl' })
        .when('/borrow', { templateUrl: 'partials/borrow.html', controller: 'ctrl' })
        .otherwise({redirectTo:'/'});
});

app.controller('ctrl', ['$scope', '$http', function($scope, $http) {

    $scope.item = {
        name: '',
        price: 0
    }
    $scope.items = [];

    $http.get('/api/item')
        .success(function(data) {
            $scope.items = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createItem = function(item) {
        $http.post('/api/item', item)
            .success(function(data) {
                $scope.formReset() // clear the form so our user is ready to enter another
                //$scope.items = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);


