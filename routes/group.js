const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/auth');

router.post('/creategroup',auth.authenticate,groupController.createGroup);

router.get('/getgroups',auth.authenticate,groupController.getGroups)

module.exports = router;