'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

process.setMaxListeners(0);

const router = require('./src/router');

const port = process.env.PORT || 4000;
const dbConnection = process.env.CONNECTDB;
const version = process.env.VERSION;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
  origin: ['*','http://localhost:3001']
}
app.use(cors(corsOptions));

app.use(`/api/${version}`, router);

app.use(function(req, res, next) {
  if(res.status(404).statusCode == 404){
  	return res.json({'status': 'false', 'message':"error", 'data': 'Not Found.'})
  }
  next();
});

mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result) {
        app.listen(port);
        console.log("App is running at Port " + port);
    })
    .catch((err) => console.log(err))