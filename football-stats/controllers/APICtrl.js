var request = require('request');

var config = require('../config/config');
var url = config.url;

var API = function() {};

API.prototype.getIDs = function(date, cb) {
    var websiteURL = url.website+date;

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

API.prototype.getMatchInfo = function(matchID, cb) {
    var params = config.params;
    params.event_id = matchID;

    var options = {
        url: url.match,
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
API.prototype.returnIDs = function(req, res, next) {
    this.getIDs(req.query.date, function(err, ids) {
        if(err) {
            res.json(err);
            return;
        }
        res.json(ids);
    });
};

API.prototype.returnMatchInfo = function(req, res, next) {
    this.getMatchInfo(req.params.matchID, function(err, json) {
        if(err) {
            res.json(err);
            return;
        }
        res.json(json);
    });
}

module.exports = new API();
