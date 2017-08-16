const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const file = require("./data.js");

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');





app.get('/users/', function(req, res) {
  res.render('index', file);

});



app.listen(port, function(){
  console.log('Listening!')
});
