angular.module("myApp", [])
.controller("MyController", function($scope, api){
    $scope.searchBing = function(){
        console.log('searching..');
    };
    api.getQuery()
        .then(function(data){
            console.log(data.data);
            $scope.searched = data.data;
        });
})
.service('api', ['$http', function($http){
    return {
        getQuery: function(){
            var promise = $http.get('api')
            .then(function(response){
                return response;
            });
            return promise;
        }
    };
}]);