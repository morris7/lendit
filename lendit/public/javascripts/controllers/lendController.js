app.controller('lendController', ['$scope', '$http', function($scope, $http) {

    $scope.item = {
        name: '',
        price: 0
    };

    $scope.items = [];

    $scope.createItem = function(item) {
        $http.post('/api/item', item)
            .success(function(data) {
                $scope.formReset(); // clear the form so our user is ready to enter another
                //$scope.items = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.formReset = function() {

        $scope.form.$setUntouched();
        $scope.item.name = null;
        $scope.item.price = null;

    };

}]);