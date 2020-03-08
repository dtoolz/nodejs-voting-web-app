const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vote = require("../models/voteModel");

require("dotenv").config();

const Pusher = require("pusher");

var pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_API_KEY2,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  encrypted: true
});

// /votes routes set in appjs, so just / will be ok
router.get("/", (req, res, next) => {
   Vote.find().then(votes => {
     res.json({
        success : true, 
        votes : votes
     });
   });
});

//to vote and save to db
router.post("/", (req, res, next) => {
  const recentVote = {
    tv: req.body.tv,
    points: 1
  };

  // new Vote as referring to db schema
  new Vote(recentVote).save().then(vote => {
    //update UI with pusher
    pusher.trigger("tv-series-app", "tv-series-vote", {
      points: parseInt(vote.points),
      tv: vote.tv
    });
    return res.json({ success: true, message: "thanks for voting" });
  });
});

module.exports = router;
