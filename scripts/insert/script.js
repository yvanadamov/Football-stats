var request = require('request');

var db = require('./models/DB');

var config = require('./config');

var API = function() {};

API.prototype.getIDs = function(date, cb) {
    var websiteURL = config.url.website+date;

    request.get(websiteURL, function(error, response, body) {
        if(error) {
            return cb(error);
        }
        if(response.statusCode != 200) {
            return cb(new Error('Status code'+response.statusCode));
        }

        var idreg = /data-x-id="\d+">/gm;
        var numReg = /[0-9]+/;

        // TODO: regex for ids without map
        var filtered = body.match(idreg);

        if(!filtered) {
            return cb(new Error('There are no ids for this day'));
        }

        ids = filtered.map(function(el) {return el.match(numReg)[0];});

        return cb(null, ids);
    });
};

API.prototype.getMatchInfo = function(matchID, categoryID, cb) {
    var params = config.params;
    
    params.event_id = matchID;
	params.cat_id = categoryID;

    var options = {
        url: config.url.match,
        qs: params,
        json: true
    };

    request.get(options, function(error, response, body) {
        if(error) {
            return cb(error);
        }
        if(response.statusCode != 200) {
            return cb(new Error('Status code'+response.statusCode));
        }

        return cb(null, body);
    });
};

API.prototype.insertMatchInfo = function(matchID) {
	var categoryID = config.params.cat_id || 0;

	var defaultInfo = this.getMatchInfo(matchID, categoryID, function(err, response) {
		if(err) {
			return console.error(err);
		}

		// insert match info
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
			result = {}
		}

		db.insertMatchInfo(matchID, time, teams, result, function(err, insertedMatch) {
			if(err) {
				return console.error(err);
			}
			// console.log('Inserted match: ', insertedMatch);
			
			// insert default category info
			this.insertCategoryInfo(teams, matchID, categoryID, response);
			
			// insert other cateories info
			config.categories.forEach(function(categoryID) {
				this.getMatchInfo(matchID, categoryID, function(err, info) {
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

API.prototype.insertCategoryInfo = function(teams, matchID, categoryID, response) {
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

	var configBookmakers = config.bookmakers;

	for(var i in configBookmakers) {
		var bookmaker = configBookmakers[i];

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

				db.insertCoeffInfo(insertObject, function(err, insertedCoeff) {
					if(err) {
						return console.error(err);
					}
					// console.log('Inserted coeff: ', insertedCoeff);
				});
			});
		});
	}
};

// TO DO: insert for multiple days
var api = new API();

api.getIDs('2016-11-03', function(err, ids) {
	if(err) {
		return console.error(ids);
	}
	
	ids.forEach(function(matchID) {
		//console.log("My match is"+matchID);
		api.insertMatchInfo(matchID);
	});
});