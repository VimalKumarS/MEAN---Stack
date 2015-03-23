/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/mean',function(){
    console.log('DB connected')
})

module.exports=mongoose