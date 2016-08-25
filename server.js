var express     = require('express');
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    fs          = require('fs'),  
    config      = require('./config'),
    request     = require("request");

var server      = express();
    router      = express.Router();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(cors());
    server.use('/', require('./routes'));

server.listen(config.server.port, config.server.ip, function(){
    console.log('Servidor corriendo en ' + config.server.ip + ':' + config.server.port );
});
