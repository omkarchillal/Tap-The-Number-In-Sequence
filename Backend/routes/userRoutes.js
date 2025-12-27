const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sync', userController.syncUser);
router.post('/score', userController.saveScore);
router.get('/leaderboard', userController.getLeaderboard);

module.exports = router;
