const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const file = require("./data.js");

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(__dirname + '/public'));


app.get('/users/', function(req, res) {
  res.render('index', file);
});


app.get('/:id/', function(req, res) {
  res.render('bots', file.users[req.params.id-1]);
});


app.listen(port, function(){
  console.log('Listening!')
});
