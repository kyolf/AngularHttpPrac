let comment_app = angular.module('comment_app', []);

comment_app.service('commentObj', function($http, $q) {
  this.comments = [];

  this.getComments = function() {
    return $http.get('/api/comment')
            .then(res=>{
              console.log(res);
              if(res.statusText !== 'OK' || res.status !== 200) {
                return $q.reject(res.statusText);
              }
              return res.data;
            });
  };

  this.postComments = function(postObj) {
    return $http.post('/api/comment', postObj)
            .then(function(res) {
              if(res.statusText !== 'OK' || res.status !== 201) {
                return $q.reject(res.statusText);
              }
              return res.data;
            });
  };

});

comment_app.controller('CommentController', function($scope, commentObj) {
  //$scope.comments = [];
  commentObj
    .getComments()
    .then(function(result) {
      $scope.comments = result;
      console.log($scope.comments)
    });
  $scope.addComments = function() {
    const postObj = {
      text: $scope.newText,
      likes: 0
    };

    commentObj
      .postComments(postObj)
      .then(function(result) {
        $scope.comments.push(result);
      });

    $scope.newText = '';
  };

  $scope.addLikes = function(index) {
    $scope.comments[index].likes++;
  };

  $scope.deleteComments = function(index) {
    $scope.comments = [...$scope.comments.slice(0,index), ...$scope.comments.slice(index+1)];
  };
});