const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');
const auth = require('../middleware/auth');

router.post('/post-invite',auth.authenticate,inviteController.postInvite);

router.get('/get-invitedhistory',auth.authenticate,inviteController.getInvitedHistory);

router.get('/get-joinrequests',auth.authenticate,inviteController.getInviteRequests);

router.get('/accept-invite/:id',auth.authenticate,inviteController.acceptInvite)

router.get('/decline-invite/:id',auth.authenticate,inviteController.declineInvite);
module.exports = router;