/* Written by JinHuyk. Mun

This code is not available (no connected DB)
if you want use? go to community-opensource in my  github

*/

var router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const { render } = require('ejs');
const fs = require('fs');

var db;
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('sema');
})

router.post('/members',function(req,res){
    db.collection('counter').findOne({name: "user"}, function(err,rst){
        var total = rst.userTotal;
        var today = new Date();
        
        db.collection('user').insertOne({
            _id : total +1,
            user : req.body.user,
            detail : req.body.detail,
            pid : parseInt(req.body.id) ,
            pnb : req.body.check,
            time : req.body.time

        }, function(err,rst){
            db.collection('data').updateOne({_id : parseInt(req.body.id)},{$inc : {usenum : 1}},function(err,rrr){
                
            })
            db.collection('counter').updateOne({name: "user"},{$inc : {userTotal : 1}}, function(err,rst){
                res.send('200')
            })
        })
    })
})
router.delete('/members',function(req,res){
    db.collection('user').findOne({_id : parseInt(req.body.id)},function(err,rst){
        if(req.body.check == rst.pnb|| req.body.check==""){
            db.collection('data').updateOne({_id : parseInt(rst.pid)},{$inc : {usenum : -1}},function(err,rst){
                
                db.collection('user').deleteOne({_id : parseInt(req.body.id)})
                res.send('200')
            })
        }else{
            res.send('304')
        }
    })
})



module.exports = router;