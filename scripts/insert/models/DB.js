var mongoose = require('mongoose');
var dbConfig = require('../config').db;

var Match = require('./Match');
var BookieData = require('./BookieInfo');

var DB = function() {
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
		totalGoals: final.home+final.away,
		isComeback: isComeback(first, second),
		result: {
			first: result.first,
			second: result.second,
			final: result.final
		}
	};

	var match = new Match(matchObject);
	return match.save(matchObject, cb);
};

DB.prototype.insertCoeffInfo = function(insertData, cb) {
	var coeff = new BookieData(insertData);
	return coeff.save(cb);
};

function getGoalsFromString(result) {
	var goals = result.split('-');
	var goalsObj = {
		home: parseInt(goals[0], 10),
		away: parseInt(goals[1], 10)
	};
	return goalsObj;
}

function isComeback(first, second) {
	var homeComeback = (first.home < first.away && second.home > second.away);
	if(homeComeback) {
		return true;
	}

	var awayComeback = (first.home > first.away && second.home < second.away);
	if(awayComeback) {
		return true;
	}
	return false;
}

module.exports = new DB();