app.controller('borrowItemController', ['$scope', '$http', '$location',
                    function($scope, $http, $location) {

    $scope.item = {};
    var id = $location.path().split('/').pop();
    $http.get('/api/item/' + id)
        .success(function(data) {
            $scope.item = data[0];
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.myInterval = 3000;


}]);