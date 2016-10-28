module.exports = {
    "db": {
        // to do: fix
        "connection": "mongodb://localhost/test",
    },

    "params": {
        "language": "en",
        "country_code": "BG",
        "cat_id": 1,
        "include_exchanges": 1,
        "event_id": null
    },

    "url": {
        "website": "http://www.oddsmath.com/football/matches/",
        "match": "http://www.oddsmath.com/api/v1/live-odds.json/?"
    },

    "categories": {
        "0"  : {"schema":["1","X","2"]},
        "1"  : {"schema":["1X","12","X2"]},
        "2"  : {"schema":["1","2"],},
        "3"  : {"subcategory":{"Handicap":"+0.5"},"schema":["1","2"]},
        "4"  : {"subcategory":{"Handicap":"0"},"schema":["1","2"]},
        "5"  : {"subcategory":{"Handicap":"-0.5"},"schema":["1","2"]},
        "6"  : {"subcategory":{"Total":"2.5"},"schema":["O","U"]},
        "7"  : {"subcategory":{"Total":"1.5"},"schema":["O","U"]},
        "8"  : {"subcategory":{"Total":"3.5"},"schema":["O","U"]},
        "9"  : {"subcategory":{"Total":"0.5"},"schema":["O","U"]},
        "10" : {"subcategory":{"Total":"4.5"},"schema":["O","U"]},
        "12" : {"subcategory":{"Total":"5.5"},"schema":["O","U"]},
        "13" : {"subcategory":{"Handicap":"+0.25"},"schema":["1","2"]},
        "14" : {"subcategory":{"Handicap":"-0.25"},"schema":["1","2"]},
        "15" : {"subcategory":{"Handicap":"+0.75"},"schema":["1","2"]},
        "16" : {"subcategory":{"Handicap":"-0.75"},"schema":["1","2"]},
        "17" : {"subcategory":{"Handicap":"+1"},"schema":["1","2"]},
        "18" : {"subcategory":{"Handicap":"-1"},"schema":["1","2"]},
        "19" : {"subcategory":{"Handicap":"+1.25"},"schema":["1","2"]},
        "20" : {"subcategory":{"Handicap":"-1.25"},"schema":["1","2"]},
        "21" : {"subcategory":{"Handicap":"-1.5"},"schema":["1","2"]},
        "22" : {"subcategory":{"Handicap":"+1.75"},"schema":["1","2"]},
        "23" : {"subcategory":{"Handicap":"-1.75"},"schema":["1","2"]},
        "24" : {"subcategory":{"Handicap":"+2"},"schema":["1","2"]},
        "25" : {"subcategory":{"Handicap":"-2"},"schema":["1","2"]},
        "26" : {"subcategory":{"Handicap":"+2.25"},"schema":["1","2"]},
        "27" : {"subcategory":{"Handicap":"-2.25"},"schema":["1","2"]},
        "28" : {"subcategory":{"Handicap":"+2.5"},"schema":["1","2"]},
        "29" : {"subcategory":{"Handicap":"-2.5"},"schema":["1","2"]},
        "30" : {"schema":["Y","N"]}
    }
};