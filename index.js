// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const TwitterStrategy = require('passport-twitter').Strategy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// Twitter OAuth setup
passport.use(new TwitterStrategy({
   consumerKey: process.env.TWITTER_CONSUMER_KEY,
   consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
   callbackURL: process.env.CALLBACK_URL,
},
(token, tokenSecret, profile, done) => {
   // Save or update user profile in DB
   User.findOneAndUpdate(
      { twitterId: profile.id },
      {
         username: profile.username,
         followersCount: profile._json.followers_count,
         profileImage: profile._json.profile_image_url_https,
      },
      { upsert: true, new: true },
      (err, user) => done(err, user)
   );
}));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));

// Routes setup here...

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
   passport.authenticate('twitter', { failureRedirect: '/' }),
   (req, res) => res.redirect('/dashboard')
);

// server/index.js
const entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);
