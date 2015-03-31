angular.module("myApp", ['ngRoute', 'ui.router'])
.controller("MyController", function($scope, api, $stateParams){
    $scope.searchBing = function(search){
        console.log('searching..', $scope.submitInfo);
    };
    api.getQuery()
        .then(function(data){
            console.log(data.data);
            $scope.searched = data.data;
        });
    $scope.testParams = $stateParams.searchQuery;
    console.log($scope.testParams);
    $scope.makeAQuery = function(search){
        api.createQuery(search);
    };
})
.service('api', ['$http', function($http){
    return {
        getQuery: function(){
            var promise = $http.get('api')
            .then(function(response){
                return response;
            });
            return promise;
        },
        createQuery: function(search){
            $http.post('api', {query: search});
        }
    };
}])
.config(function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('query', {
        url: '/:searchQuery',
        templateUrl: 'index.html'
    });
});