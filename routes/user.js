const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/signup', userController.signUp);

module.exports = router;