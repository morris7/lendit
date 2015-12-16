/**
 * Created by sam morris on 06/12/2015.
 */
angular.module('app').controller('loginController',
    ['$scope', '$location', 'AuthService','$rootScope',
        function ($scope, $location, AuthService, $rootScope) {

            console.log(AuthService.getUserStatus(),$location.search().status);
            $scope.status = $location.search().status;


            $scope.login = function () {

                // initial values
                $scope.error = false;
                $scope.disabled = true;

                // call login from service
                AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                    // handle success
                    .then(function () {
                        $location.path('/');
                        $scope.disabled = false;
                        $scope.loginForm = {};
                        //$rootScope.$broadcast('username-updated');
                    })
                    // handle error
                    .catch(function () {
                        $scope.error = true;
                        $scope.errorMessage = "Invalid username and/or password";
                        $scope.disabled = false;
                        $scope.loginForm = {};
                    });

            };

        }]);