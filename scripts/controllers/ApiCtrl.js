var request = require('request');

var config = require('../config/api');

var API = function() {};

// TODO: regex for ids without map 
API.prototype.getIDs = function(date, cb) {

    request.get(config.url.website+date, function(error, response, body) {
        if(error) {
            return cb(error);
        }
        if(response.statusCode != 200) {
            return cb(new Error('Status code'+response.statusCode));
        }

        var idreg = /data-x-id="\d+">/gm;
        var numReg = /[0-9]+/;

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

module.exports = new API();