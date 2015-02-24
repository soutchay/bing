angular.module("myApp", [])
.controller("MyController", function($scope){
    $scope.searchBing = function(){
        console.log('searching..');
    }
})