const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const upload = multer();

const sendFileController = require('../controllers/sendfileController');

router.post('/sendfile',upload.single('file'),sendFileController.sendFile)

router.post('/posturl/:groupId',auth.authenticate,sendFileController.postUrl);

router.get('/get-file/:groupId',sendFileController.getFile);

module.exports = router;