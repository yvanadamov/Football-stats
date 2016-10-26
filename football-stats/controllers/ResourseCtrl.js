var request = require('request');

module.exports = {
    getResourse: function(req, res, next) {
        var url = 'http://www.oddsmath.com/football/matches/2016-10-22/';
        var params = {};
        var cb = function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var reg = /data-x-id="\d*">/gm;

                var json = body.match(reg);
                

                console.log(typeof body);
                console.log(json);

                res.render(json);
            }
        };

        request.get(url, params, cb);
    }
};