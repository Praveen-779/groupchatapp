const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagecontroller');
const auth = require('../middleware/auth');

router.post('/postmessage',auth.authenticate, messageController.postMessage);

module.exports = router;