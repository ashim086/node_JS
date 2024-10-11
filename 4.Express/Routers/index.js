var express = require('express');
var app = express();

var things = require('./Thing.js');

//both index.js and things.js should be in same directory
app.use('/', things);

app.listen(3000);