var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	event: {
		eventID:  Number,
		countryID: Number,
		homeID: Number,
		awayID: Number,
		// no fucking idea
		isNational: Boolean
	}
	schemaID: Number,
	result: {
		// not used
		result: String,
		sign: String,
		goals: Number,
		comeback: Boolean
		var: [{
			sign: String,
			coef: Number,
			bets: Number
		}],
	}
});

var gameModel = mongoose.model('Game', gameSchema);

module.exports = matchModel;