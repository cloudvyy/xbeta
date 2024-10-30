// server/models/Entry.js
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   tweetLink: String,
});

module.exports = mongoose.model('Entry', entrySchema);

// server/index.js
const entryRoutes = require('./routes/entries');
app.use('/api/entries', entryRoutes);
