var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
	eventID: Number,
	date: Date,
	countryName: String,
	homeName: String,
	awayName:String,
	totalGoals: Number,
	isComeback: Boolean,
	result: {
		first: String,
		second: String,
		final: String
	}
});

var matchModel = mongoose.model('Match', matchSchema);

matchModel.prototype.writeInFile = function(cb) {
	return cb(null);
};

matchModel.prototype.insertInDB = function(eventID, date, teams, result, cb) {
	var home = teams[0];
	var away = teams[1];

	var intenational = (home.countryName != away.countryName);
	var countryName = (international) ? 'international' : home.countryName ;
	
	var first = getGoalsFromString(result.final);
	var second = getGoalsFromString(result.second);

	var matchObject = {
		eventID: eventID,
		date: date,
		countryName: countryName,
		homeName: home.clubName,
		awayName: away.clubName,
		totalGoals: Number,
		isComeback: isComeback(first, second),
		result: {
			first: result.first,
			second: result.second,
			final: result.final
		}
	};

	console.log('DB Insert match '+eventID, matchObject);

	var match = new matchModel(matchObject);
	match.save(function(err) {
		if(err) {
			console.log('DB Error during insert '+eventID, err);
	    	var error = new Error('DB Error Insert '+eventID);
	    	return cb(error);
		} 
		return cb(null, matchObject);
	});
};

// countryID,eventID,categoryID,bookmaker,sign,time,coef,amount;
// matchModel.prototype.insertInFile = function(countryID, eventID, )

function getGoalsFromString(result) {
	var goals = result.split(':');
	var sum = {
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

module.exports = matchModel;