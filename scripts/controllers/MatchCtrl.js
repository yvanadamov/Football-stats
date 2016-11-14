var Match = require('../models/Match');
var BookieInfo = require('../models/BookieInfo');

var ApiCtrl = require('./ApiCtrl');

var MatchCtrl = function() {};

// insert match info
MatchCtrl.prototype.insertMatch = function(matchID, config) {
	var defaultCategory = config.categories.default || 0;

	var defaultInfo = ApiCtrl.getMatchInfo(matchID, defaultCategory, function(err, response) {
		if(err) {
			return console.error(err);
		}

		var time = new Date(response.event.time);
		
		var home = {
			clubID: response.event.hometeam.id,
			clubName: response.event.hometeam.name,
			countryID: response.event.hometeam.country_id,
			countryName: response.event.hometeam.country_name,
			isNational: response.event.hometeam.national
		};

		var away = {
			clubID: response.event.awayteam.id,
			clubName: response.event.awayteam.name,
			countryID: response.event.awayteam.country_id,
			countryName: response.event.awayteam.country_name,
			isNational: response.event.awayteam.national
		};

		var teams = [home, away];

		var result;
		if(response.hasOwnProperty('livescore')) {
			result = {
				final: response.livescore.value,
				first: response.livescore['1stHalf'],
				second: response.livescore['2ndHalf']
			};
		}
		else {
			result = {};
		}

		this.insertMatchInfo(matchID, time, teams, result, function(err, insertedMatch) {
			if(err) {
				return console.error(err);
			}
			
			// insert default category info
			this.insertCategoryInfo(teams, matchID, categoryID, response, config.bookmakers);
			
			// insert other cateories info
			config.categories.additionals.forEach(function(categoryID) {
				ApiCtrl.getMatchInfo(matchID, categoryID, function(err, info) {
					if(err) {
						return console.error(err);
					}
					// insert category info
					this.insertCategoryInfo(teams, matchID, categoryID, info);
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}.bind(this));
};

MatchCtrl.prototype.insertCategoryInfo = function(teams, matchID, categoryID, response, bookmakers) {
	var schema = response.schema;
	var coeffData = response.data;

	var home = teams[0];
	var away = teams[1];

	var isInternational = (home.countryID == away.countryID);

	var countryID = (isInternational) ? 0 : home.countryID;

	var insertObject = {
		countryID: countryID, 
		matchID: matchID, 
		categoryID: categoryID, 
		bookmakerID: null, 
		sign: null, 
		time: null,
		coef: null, 
		amount: null
	};

	for(var i in bookmakers) {
		var bookmaker = bookmakers[i];

		var bookmakerName = bookmaker.name;
		var trackExchanges = bookmaker.trackExchanges;

		if(!coeffData.hasOwnProperty(bookmakerName)) {
			continue;
		}

		var data = coeffData[bookmakerName];

		insertObject.bookmakerID = coeffData[bookmakerName]['x-id'];

		var coeffInfo = (trackExchanges) ? data.history_exchange_back : data.history;

		coeffInfo.forEach(function(change) {
			insertObject.time = change.updated;
			
			schema.forEach(function(sign) {
				insertObject.sign = sign;
				insertObject.coeff = change[sign];

				if(trackExchanges) {
					insertObject.amount = change['amount_'+sign];
				}

				var coeff = new BookieData(insertObject);
				coeff.save(insertObject, function(err, insertedCoeff) {
					if(err) {
						return console.error(err);
					}
					// console.log('Inserted coeff: ', insertedCoeff);
				});
			});
		});
	}
};

MatchCtrl.prototype.insertMatchInfo = function(matchID, date, teams, result, cb) {
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

	console.log('To be inserted: ', matchObject);

	var match = new Match(matchObject);
	return match.save(matchObject, cb);
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

module.exports = new MatchCtrl();