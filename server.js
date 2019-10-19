'use strict';

const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true})); // true for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
require('dotenv').load();

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/views', express.static(process.cwd() + '/views'));
app.use('/common', express.static(process.cwd() + '/app/common'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Server listening on port ' + port + '...');
});
