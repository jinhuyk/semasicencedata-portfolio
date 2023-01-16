/* Written by JinHuyk. Mun

This code is not available (no connected DB)
if you want use? go to community-opensource in my  github

*/


const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true})) 
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
var db;
//url is private
const DB_URL = ""
MongoClient.connect(DB_URL, function(err,client){
    if(err) return console.log(err);
    db = client.db('sema');
})




app.set('view engine', 'ejs');
app.use('/styles',express.static(path.join(__dirname,'styles')))
app.use('/log',express.static(path.join(__dirname,'log')))
app.use('/resources',express.static(path.join(__dirname,'resources')))

app.listen(process.env.PORT || 3000, function(){
    console.log('open 3000')
})

app.get('/',function(req,res){
    db.collection('data').find().toArray(function(err,rst){
        db.collection('data').find({type : "admin"}).toArray(function(err,adm){
            db.collection('data').find().toArray(function(err,allrst){
                res.render('main.ejs',{data : rst, adm : adm, datas : allrst})
            })

            
        })
    })
})


app.use('/', require('./routes/board.js') );
app.use('/', require('./routes/post.js') );
app.use('/', require('./routes/user.js') );
