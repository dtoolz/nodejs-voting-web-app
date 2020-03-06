const express = require('express');
const router = express.Router();
require('dotenv').config();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_API_KEY2,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
    encrypted: true
  });

// /votes routes set in appjs, so just / will be ok
router.get('/', (req, res, next)=>{
    res.send('votes')
});

router.post('/', (req, res, next)=>{
    pusher.trigger('tv-series-app', 'tv-series-vote', {
        points : 1,
        tv : req.body.tv
      });
    return res.json({success : true, message : "thanks for voting"});
});



module.exports = router;