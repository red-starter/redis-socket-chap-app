
var https = require('https'),
		express = require('express'),
		config = require('./config'),
		client = require('./redis'),
		socketio = require('./data/socket');

var app = express();

// app.use mounts the middleware function(s) at the path. If path is not specified, it defaults to “/”.
// Mounting a middleware at a path will cause the middleware function to be executed whenever the base of the requested path matches the path.
// The static middleware handles serving up the content from a directory. In this case the 'root' directory is served up and any content (HTML, CSS, JavaScript) will be available. 
// if first param ommited , defaults to r
app.use("/",express.static(__dirname + '/client'));

// Assigns setting name to value, where name is one of the properties from the app settings table.
app.set('port', config.PORT);
// Returns the value of name app setting, where name is one of strings in the app settings table. 
var port = app.get('port')
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});

//start up socket.io
socketio(server, client);