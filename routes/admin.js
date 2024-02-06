const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/isadmin/:groupId',auth.authenticate,adminController.isAdmin);

router.get('/make-admin',adminController.makeAdmin);
module.exports = router;