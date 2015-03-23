/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var express=require('express')
var jwt= require('jwt-simple')
var app=express()
var _ = require("lodash")
app.use(require('body-parser').json())

var secretkey='supersecretkey'
var users=[{username:'dickeyxxx',password:'pass'}]

function findUserByUsername(username){
    return _.find(users,{username:username})
}

function validateUser(user,password){
    return user.password === password
}

app.post('/session',function(req,res){
    var username=findUserByUsername(req.body.username)
    if(validateUser(username,req.body.password)){
        return res.send(401)
    }
     var token=jwt.encode({username:username},secretkey)
    res.json(token)
})

app.get('/user',function(req,res){
    var token=req.headers['x-auth']
    var user=jwt.decode(token,secretkey)
    res.json(user)
})

app.listen(3000)


//var token=jwt.encode({username:'dickeyxxx'},'supersecretkey')

//console.log(token)