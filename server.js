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
		api[program]();
	} else {
		// Right way to do this?
		return new Error('Unrecognized program!  Try: ' + programList);
	}
}

// inputs are arguments to run
//// ie node server.js twitter clientkey clientsecret, token, tokensecret
function readInputs(program, clientKey, clientSecret, token, tokenSecret){
	this.program = program;
	this.clientkey = clientKey;
	this.clientSecret = clientSecret;
	this.token = token;
	this.tokenSecret = tokenSecret;
}


// Twitter method, routes for searching & posting
readInputs.prototype.twitter = function() {
	var T = new Twit({
		consumer_key:this.clientkey,
		consumer_secret:this.clientSecret,
		access_token:this.token,
		access_token_secret:this.tokenSecret
	});

	// Needs a count parameter
	app.get('/tweetsearch/:search', function(req,res){
		var searchTerm = req.params.search;
		T.get('search/tweets', {q: searchTerm, count:1}, function(err,data,response){
			return data;
		})
	});

	app.get('/tweetpost/:post', function(req,res){
		var postTerm = req.params.post;
		T.post('statuses/update', {status: postTerm}, function(err,data,response){
			return data;
		})
	})
}


readInputs.prototype.instagram = function() {

}