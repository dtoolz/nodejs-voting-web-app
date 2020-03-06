const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  tv: {
      type: String,
      required: true
  },
  points: {
      type: String,
      required: true
  }
});

//creating a collection and adding schema
const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;