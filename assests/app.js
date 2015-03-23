/**
 * Created by Vimal Kumar on 3/21/2015.
 */

var app=angular.module('app',['ngRoute']);

var secretKey='supersecretkey'
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',         { controller: 'PostsCtrl', templateUrl: '/templates/posts.html' })
        .when('/register', { controller: 'RegisterCtrl', templateUrl: '/templates/register.html' })
        .when('/login',    { controller: 'LoginCtrl', templateUrl: '/templates/login.html' })
})

app.service('PostsSvc',function($http){
    this.fetch=function(){
        return $http.get('/api/posts')
    }
    this.create=function(post){
        return $http.post('/api/posts',post)
    }
})

var validate=function(req,res,next){
    if(req.headers['x-auth']){
        req.auth=jwt.decode(req.headers['x-auth'],secretKey)
    }
    next()
}

app.controller('PostsCtrl',function($scope,PostsSvc){

    $scope.addPosts=function(){
        if($scope.postBody){
            //console.log($scope.postBody)
            PostsSvc.create({
                username:'dickey',
                body:$scope.postBody
            }).success(function(post){
                $scope.posts.unshift(post)
                $scope.postBody=null
            })
        }
    }
    PostsSvc.fetch().success(function(posts){
       // console.log("got post")
        $scope.posts=posts
    })

    $scope.$on('login', function (_, user) {
        console.log("in emit scope")
    })
})


 app.service('UserSvc', function ($http) {
        var svc = this
        svc.getUser = function () {
            return $http.get('/api/user')
                .then(function (response) {
                    console.log(response.data)
                    return response.data
                })
        }
        svc.login = function (username, password) {
            return $http.post('/api/session', {
                username: username, password: password
            }).then(function (response) {

                svc.token = response.data

                $http.defaults.headers.common['X-Auth'] = response.data
                return svc.getUser()
            })
        }
        svc.register = function (username, password) {

            return $http.post('/api/user', {
                username: username, password: password
            }).then(function () {
                return svc.login(username, password)
            })
        }
    })

app.controller('RegisterCtrl',function($scope,$location,UserSvc){

    $scope.register = function (username, password) {
        UserSvc.register(username, password)
            .then(function (user) {
                $scope.$emit('login', user)
                $location.path('/')
            })
    }

})

app.controller('LoginCtrl',function($scope, $location,UserSvc){
    $scope.login = function (username, password) {

        UserSvc.login(username, password)
            .then(function (user) {

                $scope.$emit('login', user)
                $location.path('/')
            })
    }
})

app.controller('ApplicationCtrl', function ($rootScope,$location) {
    $rootScope.$on('login', function (_, user) {
            console.log("in emit scope")

            $rootScope.currentUser = user
        })
    })