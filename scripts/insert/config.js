module.exports = {
    "db": {
        "connection": "mongodb://admin:admin123@ds139277.mlab.com:39277/football_stats_proto",
    },

    "url": {
        "website": "http://www.oddsmath.com/football/matches/",
        "match": "http://www.oddsmath.com/api/v1/live-odds.json/?"
    },

    "params": {
        "language": "en",
        "country_code": "BG",
        "cat_id": 0,
        "include_exchanges": 1,
        "event_id": null,
    },

    "bookmakers": [
        {"name": "Betfair", "trackExchanges": true},
        {"name": "Bet365", "trackExchanges": false}
    ],

    "categories": [10]
};