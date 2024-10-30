// server/routes/entries.js
const express = require('express');
const { getRetweeters } = require('../controllers/retweetController');
const router = express.Router();

// Route to get the total number of retweets for a given tweet
router.get('/:tweetId/retweet-count', async (req, res) => {
   try {
      const retweeters = await getRetweeters(req.params.tweetId);
      const totalEntries = retweeters.length;
      res.status(200).json({ totalEntries });
   } catch (error) {
      res.status(500).json({ error: 'Could not fetch retweet count' });
   }
});

module.exports = router;
