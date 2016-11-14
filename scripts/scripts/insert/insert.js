var basePath = '../../';

var config = require('./insertConfig');

var ApiCtrl = require(basePath+'controllers/ApiCtrl');
var MatchCtrl = require(basePath+'controllers/MatchCtrl');

// TODO - close connection after job is done, 
// for this purpose, 
// make sure your job is done before closing the connection
var db = require(basePath+'config/mongoose');

ApiCtrl.getIDs('2016-11-03', function(err, ids) {
	if(err) {
		return console.error(err);
	}
	
	ids.forEach(function(matchID) {
		//console.log('My match is: '+matchID);
		MatchCtrl.insertMatch(matchID, config);
	});
});