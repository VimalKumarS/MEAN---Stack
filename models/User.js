/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var db= require('../db')

var User=db.model('User',{
    username:{type:String,required:true},
    password:{type:String,required:true}
})

module.exports=User