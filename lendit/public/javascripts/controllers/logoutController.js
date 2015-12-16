/**
 * Created by sam morris on 06/12/2015.
 */

angular.module('app').controller('logoutController',
    ['$scope', '$location', 'AuthService', '$rootScope',
        function ($scope, $location, AuthService, $rootScope) {

            $scope.logout = function () {

                //console.log(AuthService.getUserStatus());

                // call logout from service
                AuthService.logout()
                    .then(function () {
                        $location.path('/login');
                        //$rootScope.$broadcast('username-updated');
                    });

            };

        }]);