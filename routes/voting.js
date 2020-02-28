const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '955126',
    key: '2d7f59f24ca256293ac8',
    secret: 'da247cb717b260d9d94b',
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