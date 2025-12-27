const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: String,
    photoURL: String,
    highScore: { type: Number, default: 0 }, // Changed from array to single number
    lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
