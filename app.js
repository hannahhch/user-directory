const express = require('express');
const app = express();
const path = require('path');
const mustache = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

//use mustache templating
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

//use CSS file
app.use(express.static(__dirname + '/public'));

//get the home page and connect mongo database
//use the collection called robots
//find all of the information and turn it into an array
//only render what mustache has in the index page
app.get('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

//post avaliable page (renders when button click)
//serach through the monogoDB and pull out robots with no job
app.post('/avaliable', function(req,res){
  MongoClient.connect(mongoURL, function(err,db){
    const robots = db.collection('robots');
    robots.find({job:null}).toArray(function(err,docs){
      res.render("index", {robots: docs})
    })
  })
})

//post employeed page (renders when button click)
//serach through the monogoDB and pull out robots with a job
app.post('/employeed', function(req,res){
  MongoClient.connect(mongoURL,function(err,db){
    const robots = db.collection('robots');
    robots.find({job:{$ne:null}}).toArray(function(err,docs){
      res.render("index", {robots: docs})
    })
  })
})

//allow users to go straight to the avaliable page
app.get('/avaliable', function(req,res){
  MongoClient.connect(mongoURL, function(err,db){
    const robots = db.collection('robots');
    robots.find({job:null}).toArray(function(err,docs){
      res.render("index", {robots: docs})
    })
  })
})

//allow users to go straight to the employeed page
app.get('/employeed', function(req,res){
  MongoClient.connect(mongoURL,function(err,db){
    const robots = db.collection('robots');
    robots.find({job:{$ne:null}}).toArray(function(err,docs){
      res.render("index", {robots: docs})
    })
  })
})

app.get('/:id', function(req,res){
  MongoClient.connect(mongoURL, function(err,db){
    const robots = db.collection('robots');
    const id = parseInt(req.params.id);
    robots.find({id:id}).toArray(function(err,docs){
      res.render("bots", {robots:docs})
    })
  })
})

//listener
app.listen(3000,function(){
  console.log("Listening on port 3000!!")
});
