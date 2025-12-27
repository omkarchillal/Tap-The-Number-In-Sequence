require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB: TapTheNumberInSequence'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Basic Health Check
app.get('/', (req, res) => {
    res.send('Tap The Number API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
