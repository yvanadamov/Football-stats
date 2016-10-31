var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clubSchema = new Schema({
    countryID: Number,
    countryName: String,
    national: Boolean,
    clubs: [{ clubID: Number, clubName: String }]
});

var clubModel = mongoose.model('Club', clubSchema);

module.exports = clubModel;