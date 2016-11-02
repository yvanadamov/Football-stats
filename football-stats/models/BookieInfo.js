var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookieInfoSchema = new Schema({
    countryID: Number,
    matchID: Number,
    categoryID: Number,
    bookmakerID: Number,
    sign:String,
    time: String,
    coeff: Number,
    amount: Number
}, {collection: 'opr_coefficients'});

var bookieInfoModel = mongoose.model('BookieInfo', bookieInfoSchema);

module.exports = bookieInfoModel;