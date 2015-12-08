/**
 * Created by sam morris on 06/12/2015.
 */

angular.module('app').controller('logoutController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.logout = function () {

                console.log(AuthService.getUserStatus());

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                    });

            };

        }]);