var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}])

.factory('oldposts', [function(){
  var o = {
    posts: [ {title: 'Home', link: 'http://www.google.com', upvotes: 5}]
  };
  return o;
}])

.controller('MainCtrl', [
	'$scope',
	'oldposts',
	function($scope, newpost){
		$scope.test = "Hello Nitish";

		$scope.posts = newpost.posts;

                $scope.addPost = function(){
                  if(!$scope.title || $scope.title === '') { return; }
                  $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 3
                  });
                  $scope.title = '';
                  $scope.link = '';
                };
                
                $scope.incrementUpvotes = function(post) {
                  post.upvotes += 1;
                };



}]);
