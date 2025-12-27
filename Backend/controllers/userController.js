const User = require('../models/User');
const GameSession = require('../models/GameSession');

exports.syncUser = async (req, res) => {
    try {
        const { uid, email, displayName, photoURL } = req.body;

        if (!uid || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Upsert user (update if exists, insert if new)
        const user = await User.findOneAndUpdate(
            { uid },
            {
                email,
                displayName,
                photoURL,
                lastLogin: new Date()
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(user);
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.saveScore = async (req, res) => {
    try {
        const { uid, score, email, displayName, status } = req.body;
        if (!uid || score === undefined) {
            return res.status(400).json({ error: 'Missing uid or score' });
        }

        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if this score is a new high score
        // Only count valid completions? If user abandons with high score, should it count?
        // Let's assume high score counts regardless of status if score > old.
        const currentHighScore = user.highScore || 0;
        const hasBeatenHighScore = score > currentHighScore;

        // Create a Game Session (History)
        const gameSession = new GameSession({
            uid,
            score,
            email: email || user.email,
            displayName: displayName || user.displayName,
            hasBeatenHighScore,
            status: status || 'completed'
        });
        await gameSession.save();

        // Update User High Score ONLY if beaten
        if (hasBeatenHighScore) {
            user.highScore = score;
            await user.save();
        }

        res.json({ user, gameSession });

    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({ highScore: { $gt: 0 } })
            .sort({ highScore: -1 })
            .limit(10)
            .select('uid displayName highScore photoURL'); // Select only necessary fields

        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
