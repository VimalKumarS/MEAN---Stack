<ul class="list-group">
        <li class="list-group-item">
            <strong>@dickey</strong>
            <span>Node rules!</span>
        </li>
        <li class="list-group-item">
            <strong>@jeffdickey</strong>
            <span>Trying out angular.js</span>
        </li>

    </ul>

 --------------------------

res.json([
        {
            username:'dickeyxxx',
            body:'node rocks'
        }
    ])
    -------------
app.controller('PostsCtrl',function($scope){
        $scope.posts=[
            {
                username:'dickeyxx',
                body:'Node rules!'
            },
            {
                username:'jeffdickey',
                body:"trying out angular js"
            }
        ]

        $scope.addPosts=function(){
            if($scope.postBody){
                $scope.posts.unshift({
                    username:'dickey',
                    body:$scope.postBody
                })
                $scope.postBody=null
            }
        }
    })

    ------
    Post.find((function(err,posts){
            if(err) { return next(err)}
            res.json(posts)
        }))

 ----------------
 app.controller('PostsCtrl',function($scope,$http){

     $scope.addPosts=function(){
         if($scope.postBody){
             //console.log($scope.postBody)
             $http.post('/api/posts',{
                 username:'dickey',
                 body:$scope.postBody
             }).success(function(post){
                 $scope.posts.unshift(post)
                 $scope.postBody=null
             })
         }
     }
     $http.get('/api/posts').success(function(posts){
         console.log("got post")
         $scope.posts=posts
     })
 })