/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var router=require('express').Router()
var express= require('express')

router.use(express.static(__dirname+'/../assests'))
router.use('/templates', express.static(__dirname + '/../templates'))

router.get('/',function(req,res){
    console.log(__dirname)
   // res.sendfile('posts.html')
    res.sendfile('app.html')
})
module.exports=router