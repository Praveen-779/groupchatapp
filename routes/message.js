const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagecontroller');
const auth = require('../middleware/auth');

router.post('/postmessage',auth.authenticate, messageController.postMessage);

router.get('/get-messages',messageController.getMessages);

module.exports = router;