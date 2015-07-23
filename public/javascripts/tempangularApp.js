var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })
    
   .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      });


  $urlRouterProvider.otherwise('home');
}])

.factory('posts', ['$http', function($http){
  var o = {
    posts: [ ]
     };
    //{title: 'Home', link: 'http://www.google.com', upvotes: 5}
  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };


  o.create = function(post) {
  return $http.post('/posts', post).success(function(data){
    o.posts.push(data);
  });
  };

  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function(data){
        post.upvotes += 1;
      });
  };

  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };

  return o;
}])

.controller('MainCtrl', [
	'$scope',
	'posts',
  'post',
	function($scope, posts,post){
		$scope.test = "Hello Nitish";

		$scope.post = post;
/*
                $scope.addPost = function(){
                  if(!$scope.title || $scope.title === '') { return; }
                  $scope.posts.push({
                    title: $scope.title,
                    link: $scope.link,
                    upvotes: 3,
                        comments: [
                            {author: 'Joe', body: 'Cool post!', upvotes: 0},
                            {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                          ]                    
                  });
                  $scope.title = '';
                  $scope.link = '';
                };
*/

              $scope.addPost = function(){
                if(!$scope.title || $scope.title === '') { return; }
                posts.create({
                  title: $scope.title,
                  link: $scope.link,
                });
                $scope.title = '';
                $scope.link = '';
              };

                $scope.incrementUpvotes = function(post) {
                  //post.upvotes += 1;
                  posts.upvote(post);
                }
}])

.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
$scope.post = posts.posts[$stateParams.id];

$scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
}


}]);
