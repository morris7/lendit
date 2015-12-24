app.controller('borrowController', ['$scope', '$http', function($scope, $http) {

    $scope.items = [];
    $scope.itemSearch = '';

        $http.get('/api/item')
        .success(function(data) {
            $scope.items = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


}]);