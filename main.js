console.log('\nLoading...');

var bodyParser          = require('body-parser'),
    express             = require('express'),
    mysql               = require('mysql'),
    parseUrlencoded     = require('urlencoded-request-parser'),
    request             = require('request'),
    sessions            = require("client-sessions");

var DataLayer           = require('./data/DataLayer'),
    WSLayer             = require('./ws/WSLayer');


//global
SERVICE_ROUTE        = "http://192.168.0.6"//"http://localhost";
SERVICE_PORT         = 3001;
SERVICE_AUDIENCE     = SERVICE_ROUTE + ":" + SERVICE_PORT;

APP_ROUTE           = "http://192.168.0.6"//"http://localhost";
APP_PORT            = 80;
APP_AUDIENCE        = APP_ROUTE + ":" + APP_PORT;

var server          = express();

//support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//enable cors
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", APP_ROUTE);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

var dataLayer = DataLayer(mysql,request);
var wsLayer   = WSLayer(dataLayer,server,sessions);

//run
server.listen(SERVICE_PORT, function () {
  console.log('\nApp server listening');
  console.log('WS Audience: '+SERVICE_AUDIENCE);
  console.log('App Audience: '+APP_AUDIENCE);
});
