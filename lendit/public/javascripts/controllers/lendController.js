app.controller('lendController', ['$scope', '$http', 'Upload','$location', function($scope, $http, Upload, $location) {

    $scope.item = {
        name: '',
        price: 0,
        description: ''
    };

    $scope.imageUploaded = false;
    $scope.items = [];
    $scope.paths = [];

    $scope.createItem = function(item) {
        item.paths = $scope.paths;
        $http.post('/api/item', item)
            .success(function(data) {
                $scope.formReset(); // clear the form so our user is ready to enter another
                //$scope.items = data;
                console.log('uploaded item: ', data);
                $location.path( "/lend-success?id=" + data.pop()._id);
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



    $scope.onFileSelect = function(image) {
        if (angular.isArray(image)) {
            image = image[0];
        }

        // This is how I handle file types in client side
        if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
            alert('Only PNG and JPEG are accepted.');
            return;
        }

        $scope.uploadInProgress = true;
        $scope.uploadProgress = 0;

        $scope.upload = Upload.upload({
            url: '/upload/image',
            method: 'POST',
            file: image
        }).progress(function(event) {
            $scope.uploadProgress = (Math.floor(event.loaded / event.total)) * 100;
            $scope.$apply();
        }).success(function(data, status, headers, config) {
            $scope.uploadInProgress = false;
            // If you need uploaded file immediately
            $scope.imageUploaded = true;
            $scope.filename = data.split('/').pop();
            $scope.paths.push($scope.filename);
        }).error(function(err) {
            $scope.uploadInProgress = false;
            console.log('Error uploading file: ' + err.message || err);
        });
    };

    $scope.$watch('files', function () {
        $scope.onFileSelect($scope.files);
    });

    $scope.$watch('file', function () {
        if ($scope.file !== null) {
            $scope.files = [$scope.file];
        }
    });

}]);