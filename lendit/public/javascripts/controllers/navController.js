/**
 * Created by sam morris on 06/12/2015.
 */
app.controller('navController', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {

    $scope.username = '';

    /*$scope.updateUsername = function() {
        $http.get('/hello').success(function (data) {
                $scope.username = data.username;
                console.log(data);


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };*/

    $scope.getName = AuthService.getUserName();

    $scope.$on('username-updated', function(){
        console.log('got it!');
        $scope.getName.then(function(user){
            $scope.username = user.username;
        });
    });
    /*$scope.getName.then(function(user){
        $scope.username = user.username;
    });*/

    //$scope.updateUsername();


}]);