/**
 * Created by Vimal Kumar on 3/21/2015.
 */
var Post=require('../../models/post')
var router=require('express').Router()

router.get('/', function (req, res, next) {
        //console.log(req)
        Post.find().sort('-date').exec(function (err, posts) {
            if (err) {
                return next(err)
            }
            res.json(posts)
        })
    })

    router.post('/', function (req, res) {
        console.log('post received')
        //console.log(req);

        var post = new Post({
            username: req.body.username,
            body: req.body.body
        })

        post.save(function (err, post) {
            if (err) {
                return next(err)
            }
            res.json(201, post)
        })

        //res.send(201)
    })

module.exports=router