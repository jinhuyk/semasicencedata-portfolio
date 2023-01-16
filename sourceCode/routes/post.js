/* Written by JinHuyk. Mun

This code is not available (no connected DB)
if you want use? go to community-opensource in my  github

*/

var router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const { render } = require('ejs');
const methodOverride = require('method-override')
router.use(methodOverride('_method'))
var db;
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('sema');
})




router.get('/items', function(req,res){
    res.render('dataAdd.ejs')
})
router.get('/notices', function(req,res){
    res.render('dataAddadmin.ejs')
})
router.post('/items', function(req,res){
    if(req.body.type == "admin"){
        if(req.body.check == ""){
            db.collection('counter').findOne({name: "dataTotal"}, function(err,rst){
                var total = rst.dataTotal;
                db.collection('data').insertOne(
                    {
                        _id : total +1,
                        title : req.body.title,
                        body : req.body.body,
                        type : req.body.type,
                        manager : req.body.manager,
                        number : 0
                    }, function(err,rst){
                        db.collection('counter').updateOne({name:'dataTotal'},{$inc: {dataTotal : 1}}, function(err,rst){
                            if(err) return console.log(err)
                            res.send('201')
                        })
                    }
                )
            })
        }
        else{
            res.send('304')
        }
    }
    else{
        if(req.body.check == ""){
            db.collection('counter').findOne({name: "dataTotal"}, function(err,rst){
                var total = rst.dataTotal;
                db.collection('data').insertOne(
                    {
                        _id : total +1,
                        title : req.body.title,
                        body : req.body.body,
                        type : req.body.type,
                        number : req.body.number,
                        manager : req.body.manager,
                        place : req.body.place,
                        usenum : 0
                    }, function(err,rst){
                        db.collection('counter').updateOne({name:'dataTotal'},{$inc: {dataTotal : 1}}, function(err,rst){
                            if(err) return console.log(err)
                            res.send('201')
                        })
                    }
                )
            })
        }
        else{
            res.send('304')
        }
    }

    
  
    
})

router.delete('/items',function(req,res){
    if(req.body.check == ""){
        db.collection('data').deleteOne({_id : parseInt(req.body.id)},function(err,rst){
            res.send('200')
        })
    }
    else{
        res.send('304')
    }

})
router.get('/edit/:id',function(req,res){
        
        db.collection('data').findOne({_id : parseInt(req.params.id)}, function(err,rst){
            
            if(rst.type =="admin"){
                res.render('dataEditadmin.ejs', {data : rst})
            }
            else{
                res.render('dataEdit.ejs', {data : rst})
            }

        })

    
    
})
router.get('/search',function(req,res){
    db.collection('data').find().toArray(function(err,allrst){
        db.collection('data').find({title : req.query.value}).toArray(function(err,rst){
            db.collection('data').find({type : "admin"}).toArray(function(err,adm){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })
        })
    })
    

})
router.post('/edit-item',function(req,res){
    if(req.body.check == ""){
        db.collection('data').findOne({_id : parseInt(req.body.id)}, function(err,rst){
            db.collection('data').updateOne({_id : parseInt(req.body.id)},{$set : {
                    title : req.body.title,
                    body : req.body.body,
                    type : req.body.type,
                    number : req.body.number,
                    place : req.body.place
            }},function(err,rst){
                res.send('200')
            })
        })
    }else{
        res.send('304')
    }
    
})
router.post('/edit-notice',function(req,res){

    if(req.body.check == ""){
        db.collection('data').findOne({_id : parseInt(req.body.id)}, function(err,rst){
            db.collection('data').updateOne({_id : parseInt(req.body.id)},{$set : {
                    title : req.body.title,
                    body : req.body.body
            }},function(err,rst){
                res.send('200')
            })
        })
    }
    else{
        res.send('304')
    }  
})
module.exports = router;