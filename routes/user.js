const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/signup', userController.signUp);

router.post('/login',userController.login);

router.get('/get-users',userController.getUser);

module.exports = router;