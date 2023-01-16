/* Written by JinHuyk. Mun

This code is not available (no connected DB)
if you want use? go to community-opensource in my  github

*/

var router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const { render } = require('ejs');
var db;
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('sema');
})

router.get('/newton',function(req,res){
    db.collection('data').find({type : "newton"}).toArray(function(err,rst){
        db.collection('data').find({type : "admin"}).toArray(function(err,adm){
            db.collection('data').find().toArray(function(err,allrst){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })
        })
        
    })
})
router.get('/curie',function(req,res){
    db.collection('data').find({type : "curie"}).toArray(function(err,rst){
        db.collection('data').find({type : "admin"}).toArray(function(err,adm){
            db.collection('data').find().toArray(function(err,allrst){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })
        })
    })
})
router.get('/darwin',function(req,res){
    db.collection('data').find({type : "darwin"}).toArray(function(err,rst){
        db.collection('data').find({type : "admin"}).toArray(function(err,adm){
            db.collection('data').find().toArray(function(err,allrst){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })
        })
       
    })
})
router.get('/kepler',function(req,res){
    db.collection('data').find({type : "kepler"}).toArray(function(err,rst){
        db.collection('data').find({type : "admin"}).toArray(function(err,adm){
            db.collection('data').find().toArray(function(err,allrst){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })
        })
        
    })
})
router.get('/resource',function(req,res){
    db.collection('data').find({type : "resource"}).toArray(function(err,rst){
        db.collection('data').find({type : "admin"}).toArray(function(err,adm){
            db.collection('data').find().toArray(function(err,allrst){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })
        })
    })
})
router.get('/members',function(req,res){
    db.collection('data').find().toArray(function(err,rst){
        db.collection('user').find().toArray(function(err,usr){
                res.render('dataDetailmember.ejs',{data : rst, usr : usr})
        })
    })
})

router.get('/items/:id',function(req,res){
    db.collection('data').findOne({_id : parseInt(req.params.id)}, function(err,rst){
        db.collection('user').find({pid : parseInt(req.params.id)}).toArray(function(err,usr){
            if(rst.type =="admin"){
                res.render('dataDetailadmin.ejs',{data : rst, usr : usr})
            }
            else{

                res.render('dataDetail.ejs',{data : rst, usr : usr})
            }
            
            
        })
  
    })
})


module.exports = router;