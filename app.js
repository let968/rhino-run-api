var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require("./config");
var apiController = require("./controllers/api-controller");
var setupController = require("./controllers/setup-controller");

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    var allowedOrigins = ['http://127.0.0.1:8080', 'https://rhino-run.letourneau.io'];
    var origin = req.headers.origin;

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
}

var port = process.env.PORT || 3000;

app.use('/assets',express.static(__dirname + '/public'));
app.use(allowCrossDomain);

app.set('view engine','ejs');

mongoose.connect(config.getDbConnectionString(),{ useNewUrlParser: true });
apiController(app);
setupController(app);

app.listen(port);
