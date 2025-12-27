const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    displayName: String,
    email: { type: String, required: true },
    score: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'abandoned'], default: 'completed' },
    endedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    hasBeatenHighScore: { type: Boolean, default: false }
});

module.exports = mongoose.model('GameSession', gameSessionSchema);
