angular.module("myApp", ['ngRoute', 'ui.router'])
.controller("MyController", function($scope, api, $stateParams){
    api.getQuery()
        .then(function(data){
            console.log(data.data);
        });
    //Unneeded stuff below
    $scope.testParams = $stateParams.searchQuery;
    console.log($scope.testParams);
    $scope.makeAQuery = function(search){
        api.createQuery(search);
        api.getQuery()
            .then(function(data){
                console.log(data.data[data.length-1]);
                $scope.searched = data.data;
            });
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