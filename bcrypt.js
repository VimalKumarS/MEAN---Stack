/**
 * Created by Vimal Kumar on 3/21/2015.
 */

var express= require("express")
var jwt=require('jwt-simple')
var _ =require('lodash')
var app=express()

var bcrypt=require('bcrypt')

app.use(require('body-parser').json())

var users =[{username:'dickeyxxx',password:'$2a$10$mbuyAlgCKW6Q3JmrW8VlZeyvtPiOOal89wDY3HMGebnsDujKDQx.O'}]
var secretKey='supersecretkey'

function findUserByUsername(username){
    return _.find(users,{username:username})
}

function validateUser(user,password,cb){
    bcrypt.compare(password,user.password,cb)

}
app.post('/session',function(req,res){
    var user=findUserByUsername(req.body.username)
    validateUser(user,req.body.password,function(err,valid) {
        if (err || !valid) {
            return res.send(401)
        }

        var token = jwt.encode({username: user.username}, secretKey)
        res.json(token)
    })
})

app.get('/user',function(req,res){
    var token=req.headers['x-auth']
    var user=jwt.decode(token,secretkey)
    res.json(user)
})
