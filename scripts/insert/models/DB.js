var mongoose = require('mongoose');
var dbConfig = require('../config').db;

var Match = require('./Match');
var BookieData = require('./BookieInfo');

var DB = function() {
	// TODO - close connection after job is done, for this purpose, make sure your job is done before closing the connection
	this.connection = mongoose.connect(dbConfig.connection);
};

DB.prototype.insertMatchInfo = function(matchID, date, teams, result, cb) {
	var home = teams[0];
	var away = teams[1];

	var international = (home.countryID != away.countryID);
	var countryName = (international) ? 'international' : home.countryName ;
	
	var first = getGoalsFromString(result.final);
	var second = getGoalsFromString(result.second);
	var final = getGoalsFromString(result.final);

	var matchObject = {
		matchID: matchID,
		date: date,
		countryName: countryName,
		homeName: home.clubName,
		awayName: away.clubName,
		totalGoals: getTotalGoals(final),
		isComeback: isComeback(first, final),
		result: {
			first: result.first,
			final: result.final,
			second: result.second
		}
	};

	var match = new Match(matchObject);
	console.log(JSON.stringify(matchObject)+' is my object');
	return match.save(matchObject, cb);
};

DB.prototype.insertCoeffInfo = function(insertData, cb) {
	var coeff = new BookieData(insertData);
	return coeff.save(cb);
};

function getGoalsFromString(result) {
	if(!result) {
		return null;
	}
	var goals = result.split('-');
	var goalsObj = {
		home: parseInt(goals[0], 10),
		away: parseInt(goals[1], 10)
	};
	return goalsObj;
}

function getTotalGoals(final) {
	if(!final) {
		return null;
	}
	var totalGoals = final.home+final.away;
	return totalGoals;
}

function isComeback(first, final) {
	if(!first || !final) {
		return null;
	}
	var homeComeback = (first.home < first.away && final.home > final.away);
	if(homeComeback) {
		return true;
	}

	var awayComeback = (first.home > first.away && final.home < final.away);
	if(awayComeback) {
		return true;
	}
	return false;
}

module.exports = new DB();