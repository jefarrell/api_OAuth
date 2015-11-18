
var express = require('express');
var Twit = require('twit');
var app = express();

// Start server, run initialize
var server = app.listen(3000,function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('listening at http://%s:%s', host, port);
	initialize();
});

// Read arguments, splice, make object, call appropriate method
function initialize() {
	var programList = ['twitter', 'instagram'];
	var args = process.argv.slice(2);
	var api = new readInputs(args[0],args[1],args[2],args[3],args[4]);
	var program = args[0].toLowerCase();

	if (programList.indexOf(program) > -1) {
		console.log("ran: " + program);
		api[program]();
	} else {
		return new Error('Unrecognized program!  Try: ' + programList);
	}
}

function readInputs(program, clientKey, clientSecret, token, tokenSecret){
	this.program = program;
	this.clientkey = clientKey;
	this.clientSecret = clientSecret;
	this.token = token;
	this.tokenSecret = tokenSecret;
}


readInputs.prototype.twitter = function() {
	var T = new Twit({
		consumer_key:this.clientkey,
		consumer_secret:this.clientSecret,
		access_token:this.token,
		access_token_secret:this.tokenSecret
	});

	if (app.get('/tweetsearch/:search', function(req,res){
		var searchTerm = req.params.search;
		T.get('search/tweets', {q: searchTerm, count:1}, function(err,data,response){
			console.log(data);
		})
	}));
}

readInputs.prototype.instagram = function() {

}










