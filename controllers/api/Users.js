/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var User=require('../../models/User')
var router=require('express').Router()
var bcrypt=require('bcrypt')
var jwt=require('jwt-simple')
var secretKey='supersecretkey'

router.post('/user',function(req,res,next){
    var user=new User({username:req.body.username})
    bcrypt.hash(req.body.password,10,function(err,hash){
        user.password=hash
        user.save(function(err,user){
            if(err){throw next(err)}
            res.sendStatus(201)
        })
    })
})

router.post('/session',function(req,res,next){
    //console.log(req.body.username)
    User.findOne({username:req.body.username},function(err,user){
        if(err) { return next(err)}
        if(!user) {return res.send(401)}
        //console.log(user.password)
        bcrypt.compare(req.body.password,user.password,function(err,valid){

            if(err){ return next(err)}
            if(!valid) { return res.send(401)}
            var token=jwt.encode({username:user.username},secretKey)
            //console.log(token)
            res.send(token)
        })
    })
})

router.get('/user',function(req,res){
    var token=req.headers['x-auth']

    var auth=jwt.decode(token,secretKey)
    User.findOne({username:auth.username},function(err,user){
        res.json(user)
    })
})

module.exports=router