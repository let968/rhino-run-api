const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let scoreSchema = new Schema({
    name: String,
    score: Number,
    timeSpentTurningLeft: Number,
    timeSpentTurningRight: Number,
    jumps: Number,
    createdOn: Date
});

let scores = mongoose.model('scores', scoreSchema);

module.exports = scores;