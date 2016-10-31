var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	event: {
		eventID:  Number,
		time: Date,
		countryID: Number,
		homeID: Number,
		awayID: Number,
	},
	results: [{
		// not used
		result: String,
		categoryID: Number,
		sign: String,
		goals: Number,
		comeback: Boolean
		var: [{
			sign: String,
			coef: Number,
			bets: Number
		}],
	}]
});

var gameModel = mongoose.model('Game', gameSchema);

module.exports = matchModel;