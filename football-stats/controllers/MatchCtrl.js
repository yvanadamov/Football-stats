var APICtrl = require('./APICtrl');

var MatchCtrl = function() {};

var bookmakers = require('../config/config').bookmakers;


MatchCtrl.prototype.insertMatch = function(req, res, next) {
	APICtrl.getMatchInfo(req.body.matchID, function(err, response) {
		if(err) {
			res.json(err);
			return;
		}

		var eventID = response.request.params.event_id;
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

		var categoryID = response.request.params.cat_id;

		var result = {
			final: response.livescore.value,
			first: response.livescore['1stHalf'],
			second: response.livescore['2ndHalf']
		};


		var bookmakersData = bookmakers.map(function(bookie) {
			var bookieName = bookie.name;
			var bookieData = response.data[bookieName];
			var trackExchanges = bookie.trackExchanges;

			var history = (trackExchanges) ? bookieData.history_exchange_back : bookieData.history;

			var o = {};
			o[bookieName] = getBookmakerData(history, response.schema, trackExchanges);
			return o;
		});

		var matchInfo = {
			eventID: eventID,
			time: time,
			teams: [home, away],
			categoryID: categoryID,
			result: result,
			bookmakersData: bookmakersData
		};

		res.json(matchInfo);
	});
};

function getBookmakerData(history, schema, amount) {
	var coeficients = {};

	for(var i in schema) {
		var sign = schema[i];
		coeficients[sign] = [];
	}

	// for every document in data collection we have x:{date, coef, bets}
	history.forEach(function(el) {
		schema.forEach(function(sign) {
			var o = {
				date: new Date(el.updated),
				coef: el[sign]
			};

			if(amount) {
				o.amount = el['amount_'+sign];
			}
			coeficients[sign].push(o);
		});
	});

	return coeficients;
}

function getGoalsFromString(result) {
	var goals = result.split(':');
	var goalsObj = {
		home: parseInt(goals[0], 10),
		away: parseInt(goals[1], 10)
	};
	return goalsObj;
}

function getSignFromGoalsObject(goals) {
	if(goals.home == goals.away) {
		return 'X';
	}
	return (goals.home > goals.away) ? 1 : 2
}

module.exports = new MatchCtrl();