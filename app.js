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

app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, docs) {
      res.render("index", {robots: docs})
    })
  })
})

app.get('/users/', function(req, res) {
  res.render('index', file);
});


app.get('/:id/', function(req, res) {
  res.render('bots', file.users[req.params.id-1]);
});

app.listen(3000,function(){
  console.log("Listening for Mongo")
});
