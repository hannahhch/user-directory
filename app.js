const express = require('express');
const app = express();
const path = require('path');
const mustache = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';




app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

app.get('/avaliable', function(req,res){
  MongoClient.connect(mongoURL, function(err,db){
    const robots = db.collection('robots');
    robots.find({job:null}).toArray(function(err,docs){
      res.render("index", {robots: docs})
    })
  })
})

app.get('/employeed', function(req,res){
  MongoClient.connect(mongoURL,function(err,db){
    const robots = db.collection('robots');
    robots.find({job:{$ne:null}}).toArray(function(err,docs){
      res.render("index", {robots: docs})
    })
  })
})



app.listen(3000,function(){
  console.log("Listening for Mongo")
});
