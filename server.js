/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var express= require('express')
var bodyParser=require('body-parser')

var Post=require('./controllers/api/posts')
var user=require('./controllers/api/Users')
var app=express()

app.use(bodyParser.json())

app.use('/api/posts',Post)
app.use('/api',user)
app.use('/',require('./controllers/static'))

app.listen(3000,function(){
    console.log('server listenin on ',3000)
})