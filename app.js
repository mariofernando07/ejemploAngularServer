var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var settings = require("./settings/settings");

var mDB;
mongo.connect(""+settings.database,function(err,db){
  if(err){
    console.log("Error al conectarse a mongo");
  }else{
    console.log("Conexion exitosa");
    mDB = db;
  }
});

var api = require("./routes/api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  req.db = mDB;
  next();
});

app.use("/api", api);

var server = app.listen(8080, function () {
	  console.log('Servidor ejecutandose en localhost:8080');
});