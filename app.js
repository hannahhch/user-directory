const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/:template', function(req, res) {
  res.render('index', { name: 'example'});
});


app.listen(port, function(){
  console.log('Listening!')
});
