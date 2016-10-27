var request = require('request');

var url = require('../config/config').url;

module.exports = {
    getResourse: function(req, res, next) {
        // TODO: get data for range of dates
        var websiteURL = url.website+getFormatedDate(new Date());

        var params = {};

        // TODO: regex for ids without map
        var processRequest = function(error, response, body) {
            if(error || response.statusCode != 200) {
                res.render('error', { error: error });
            }

            var idreg = /data-x-id="\d+">/gm;
            var numReg = /[0-9]+/;

            var ids = body.match(idreg)
                            .map(function(el) {
                                return el.match(numReg)[0];
                            });

            res.render('index', {title: JSON.stringify(ids)});
        };

        request.get(websiteURL, params, processRequest);
    }
};

// input: Date object, output yyyy-mm-dd
function getFormatedDate(date) {
    var yyyy = date.getFullYear();
    var mm = date.getMonth()+1;
    var dd = date.getDate();

    var formattedDate = yyyy+'-'+mm+'-'+dd;
    return formattedDate;
}
