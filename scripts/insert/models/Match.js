var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    matchID: Number,
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
}, {collection: 'opr_matches'});

var matchModel = mongoose.model('Match', matchSchema);

module.exports = matchModel;