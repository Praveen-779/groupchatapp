const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const auth = require('../middleware/auth');

router.post('/signup', userController.signUp);

router.post('/login',userController.login);

router.get('/get-users',auth.authenticate,userController.getUser);

module.exports = router;