var express = require('express');
var babelify = require('babelify');
var browserify = require('browserify-middleware');
var less = require('less-middleware');
var nunjucks = require('nunjucks');
var config = require('./client/config');
var routes = require('./server/routes/api.todo.routes.js');
var mongoose = require('mongoose');
var serverConfig = require('./server/serverConfig');
var bodyParser = require('body-parser');

// initialise express
var app = express();

// use nunjucks to process view templates in express
// render engine
nunjucks.configure('server/templates/views', {
    express: app
});

// Connect to MongoDB via mongoose
mongoose.connect(serverConfig.mongo.uri);

mongoose.connection.on('connected', function() {
  console.log("mongoose is connected at " + serverConfig.mongo.uri);
});

mongoose.connection.on('error', function(err) {
  console.log("mongoose experienced an error, ", err);
});

mongoose.connection.on('disconnected', function() {
  console.log("Mongoose disconnected.");
});

// set up body parsing middleware to handle the forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// less will automatically compile matching requests for .css files
app.use(less('public'));
// public assets are served before any dynamic requests
app.use(express.static('public'));

// common packages are precompiled on server start and cached
// tells the server that when a get request is issued for common.js, 
// serve up the browserified version of the packages
app.get('/js/' + config.common.bundle, browserify(config.common.packages, {
	cache: true,
	precompile: true
}));

// any file in /client/scripts will automatically be browserified,
// excluding common packages.
// this is middleware for any requests for the /js path
// they are browserified! viola 
app.use('/js', browserify('./client/scripts', {
	external: config.common.packages,
	transform: [babelify.configure({
		plugins: ['object-assign']
	})]
}));

/*
	set up any additional server routes (api endpoints, static pages, etc.)
	here before the catch-all route for index.html below.
*/
app.use('/api/todo', routes);

app.get('*', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
    res.render('index.html');
});

// start the server
var server = app.listen(process.env.PORT || 3000, function() {
	console.log('\nServer ready on port %d\n', server.address().port);
});
